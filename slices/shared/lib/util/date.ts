export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const seconds = (x: number) => x * SECOND;
export const minutes = (x: number) => x * MINUTE;
export const hours = (x: number) => x * HOUR;
export const days = (x: number) => x * DAY;
