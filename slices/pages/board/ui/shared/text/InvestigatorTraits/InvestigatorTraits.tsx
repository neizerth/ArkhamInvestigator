import { withLocaleFont } from "@features/i18n"
import { boardText } from "@pages/board/config"
import { color, font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
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

export const InvestigatorTraits: FC<InvestigatorTraitsProps> = styled(BaseTraits)`
  text-align: center;
  color: ${color.text};
  ${({ unit }: InvestigatorTraitsProps) => css`
    font-size: ${unit * boardText.ratio.traits}px;
  `}
`