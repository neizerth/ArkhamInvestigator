export const capitalize = <T extends string>(text: string) => 
  text[0].toUpperCase() + text.slice(1) as Capitalize<T>;

export const signedNumber = (value: number) => value > 0 ? `+${value}` : value.toString();