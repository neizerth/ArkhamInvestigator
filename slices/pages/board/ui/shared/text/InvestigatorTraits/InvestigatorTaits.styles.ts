import { boardText } from "@pages/board/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { SanCn } from "@shared/fonts/SanCn"
import { getKeyConfig } from "@shared/lib"
import { TextStyle } from "react-native"

type GetInvestigatorTraitsStyleOptions = {
  language: string
  unit: number
}
export const getInvestigatorTraitsStyle = ({
  language,
  unit
}: GetInvestigatorTraitsStyleOptions) => {
  const getStyle = getKeyConfig<TextStyle>({
    default: {
      fontFamily: ArnoPro.bold,
      fontSize: unit * boardText.ratio.traits
    },
    ko: {
      marginBottom: 5,
      fontFamily: SanCn.bold
    }
  })

  return getStyle(language);
}