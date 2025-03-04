import { boardText } from "@pages/board/config"
import { font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { withLocaleFont } from "@shared/lib/hoc"
import { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { PixelRatio, TextProps } from "react-native"
import styled, { css } from "styled-components/native"

const BaseTraits = withLocaleFont({
  style: {
    default: {
      fontFamily: ArnoPro.bold
    }
  }
})

export type InvestigatorTraitsProps = TextProps & Partial<PropsWithUnit>;

console.log({
  dpr: PixelRatio.get()
})

export const InvestigatorTraits: FC<InvestigatorTraitsProps> = styled(BaseTraits)`
  text-align: center;
  ${({ unit }: InvestigatorTraitsProps) => unit && css`
    font-size: ${unit * boardText.ratio.traits}px;
  `}
`