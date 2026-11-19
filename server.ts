import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_VERCEL = Boolean(process.env.VERCEL);

const SANTA_ACTING_STYLE =
  "Audio style: A kind 78-year-old grandfather as Santa Claus. Deep, warm, slightly raspy chest voice, gentle and jovial, speaking slowly with affectionate pauses and a warm chuckle on 'Ho ho ho' or 'Jo jo jo'. Clear enough for children to understand their name, never sounding like a young radio announcer.";

function createWavHeader(
  pcmByteLength: number,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
): Buffer {
  const header = Buffer.alloc(44);
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;

  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + pcmByteLength, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(pcmByteLength, 40);
  return header;
}

function ensureWavBuffer(rawBase64: string, mimeType?: string): Buffer {
  const raw = Buffer.from(rawBase64, 'base64');
  if (raw.length >= 12 && raw.subarray(0, 4).toString('ascii') === 'RIFF') {
    return raw;
  }
  const rateMatch = mimeType ? /rate=(\d+)/i.exec(mimeType) : null;
  const sampleRate = rateMatch
    ? Math.max(8000, Math.min(48000, Number(rateMatch[1])))
    : 24000;
  const header = createWavHeader(raw.length, sampleRate, 1, 16);
  return Buffer.concat([header, raw]);
}

const app = express();
app.use(express.json({ limit: '128kb' }));

app.post('/api/santa-tts', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      return;
    }

    const body = req.body as { script?: unknown; lang?: unknown } | undefined;
    const script = typeof body?.script === 'string' ? body.script.trim() : '';

    if (!script || script.length > 1500) {
      res.status(400).json({ error: 'Invalid or empty Santa call script.' });
      return;
    }

    const actingPrompt = `${SANTA_ACTING_STYLE}\n\n${script}`;

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: actingPrompt }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const audioPart = parts.find((p) => p.inlineData?.data);
    const base64Data = audioPart?.inlineData?.data;
    const mimeType = audioPart?.inlineData?.mimeType;

    if (!base64Data) {
      res.status(502).json({ error: 'No audio returned by Gemini TTS.' });
      return;
    }

    const wavBuffer = ensureWavBuffer(base64Data, mimeType);
    res.json({
      audioBase64: wavBuffer.toString('base64'),
      mimeType: 'audio/wav',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected TTS generation error';
    console.error('[/api/santa-tts] error:', message);
    res.status(500).json({ error: message });
  }
});

async function startLocalServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.use((req, res, next) => {
        if (req.method !== 'GET' || req.path.startsWith('/api/')) {
          next();
          return;
        }
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SANTA MAGIA server listening on http://0.0.0.0:${PORT}`);
  });
}

if (!IS_VERCEL) {
  void startLocalServer();
}

export default app;
