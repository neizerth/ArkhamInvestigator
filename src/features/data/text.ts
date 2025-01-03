export const prefix = (prefix: string) => (value: string) => prefix + value;

export const isDigit = (char: string): boolean => !isNaN(Number(char))