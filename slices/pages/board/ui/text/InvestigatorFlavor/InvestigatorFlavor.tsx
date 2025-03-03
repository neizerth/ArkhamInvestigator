import { boardText } from "@pages/board/config"
import { font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { withLocaleFont } from "@shared/lib/hoc"
import { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { TextProps } from "react-native"
import styled, { css } from "styled-components/native"

const Flavor = withLocaleFont({
  style: {
    default: {
      fontFamily: ArnoPro.italic
    }
  }
})

export type InvestigatorFlavorProps = TextProps & Partial<PropsWithUnit>;

export const InvestigatorFlavor: FC<InvestigatorFlavorProps> = styled(Flavor)`
  text-align: center;
  ${({ unit }: InvestigatorFlavorProps) => unit && css`
    margin-top: ${unit * 0.8}px; 
    font-size: ${unit * boardText.ratio.flavor}px;
  `}
`