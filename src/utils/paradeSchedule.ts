export type ParadeScheduleStatus = 'countdown' | 'live' | 'ended';

export interface ParadeScheduleState {
  status: ParadeScheduleStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isSimulated: boolean;
  isChristmasDay: boolean;
}

/**
 * Checks whether the current local date is December 25 or 26 (month === 11 && (day === 25 || day === 26)),
 * and calculates live countdown (days, hours, minutes, seconds) toward 00:00:00 on December 25.
 */
export function getParadeScheduleState(
  simulatedDec25: boolean,
  now: Date = new Date()
): ParadeScheduleState {
  if (simulatedDec25) {
    return {
      status: 'live',
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isSimulated: true,
      isChristmasDay: true,
    };
  }

  const month = now.getMonth(); // 11 = December
  const day = now.getDate();

  if (month === 11 && (day === 25 || day === 26)) {
    return {
      status: 'live',
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isSimulated: false,
      isChristmasDay: day === 25,
    };
  }

  if (month === 11 && day >= 27) {
    const nextYearTarget = new Date(now.getFullYear() + 1, 11, 25, 0, 0, 0, 0);
    const diffMs = Math.max(0, nextYearTarget.getTime() - now.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      status: 'ended',
      days,
      hours,
      minutes,
      seconds,
      isSimulated: false,
      isChristmasDay: false,
    };
  }

  const target = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0);
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    status: 'countdown',
    days,
    hours,
    minutes,
    seconds,
    isSimulated: false,
    isChristmasDay: false,
  };
}
