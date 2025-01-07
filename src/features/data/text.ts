export const prefix = (prefix: string) => (value: string) => prefix + value;

export const isDigit = (char: string): boolean => !isNaN(Number(char));

export const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1);

export const uniqId = (): string => Math.random().toString(36).slice(2);

export const twoDigits = (x: number) => x > 9 ? x.toString() : `0${x}`;