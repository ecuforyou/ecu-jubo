import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(timezone);
dayjs.extend(isBetween);
const TIMEZONE = 'Asia/Seoul';

export function now() {
  return dayjs.tz(TIMEZONE);
}
export function isFirstWeek(day: Dayjs) {
  const firstWeek = day.startOf('month').startOf('week');
  const firstWeekLastDay = day.startOf('month').endOf('week');
  return day.isBetween(firstWeek, firstWeekLastDay);
}
export function isLastWeek(day: Dayjs) {
  const lastWeek = day.endOf('month').startOf('week');
  return day.isAfter(lastWeek);
}
export function monthOwnsWeek(month: number, day: Dayjs) {
  // dayjs().
}

export function getFirstWeek(day: Dayjs) {
  day.startOf('month');
}
export function diff(from: Dayjs, to: Dayjs) {
  return from.diff(to);
}
