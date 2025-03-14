import { boardText } from "@pages/board/config"
import { color } from "@shared/config"
import { ArnoPro, STKaiti } from "@shared/fonts"
import { DXPn } from "@shared/fonts"
import { getKeyConfig } from "@shared/lib"
import type { TextStyle } from "react-native"

export type GetStylesOptions = {
  language: string
  unit: number
}

export const getInvestigatorFlavorStyles = ({
  language,
  unit
}: GetStylesOptions) => {
  const fontSize = unit * boardText.ratio.text;

  const getStyle = getKeyConfig<Partial<TextStyle>>({
    default: {
      fontFamily: ArnoPro.italic,
      fontSize,
      lineHeight: fontSize * 1.15,
      textAlign: 'center',
      color: color.text
    },
    ko: {
      fontFamily: DXPn.medium,
      fontSize: fontSize * 0.9,
    },
    zh: {
      fontFamily: STKaiti.italic,
      fontSize: fontSize * 0.9,
    }
  })

  return getStyle(language);
}