import { twoDigits } from "./text";

export const hhmm = (date: Date) => {
  const hh = twoDigits(date.getHours());
  const mm = twoDigits(date.getMinutes());

  return `${hh}:${mm}`;
}