import { color } from "@shared/config"

export const valueStyle = {
  color: color.white
}

export const numberSize: Record<number, number> = {
  1: 50,
  2: 40,
  3: 30
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

  const fontSize = numberSize[digitsCount] || defaultFontSize;

  return {
    fontSize
  }
}