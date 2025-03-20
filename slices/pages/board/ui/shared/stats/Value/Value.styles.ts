import { color, font } from "@shared/config"

export const valueStyle = {
  color: color.white
}

export const numberSize: Record<number, number> = {
  1: 55,
  2: 38,
  3: 35
}

type GetValueStyleOptions = {
  defaultFontSize?: number
  value: number | string
}
export const getFontStyle = ({
  defaultFontSize,
  value
}: GetValueStyleOptions) => {
  const digitsCount = value.toString().length;

  const fontSize = defaultFontSize || numberSize[digitsCount] || 0;

  return {
    fontSize
  }
}