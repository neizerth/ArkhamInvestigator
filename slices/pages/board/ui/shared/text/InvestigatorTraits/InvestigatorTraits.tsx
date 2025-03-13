import { withLocale } from "@features/i18n"
import { boardText } from "@pages/board/config"
import { color, font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { SanCn } from "@shared/fonts/SanCn"
import { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { PixelRatio, TextProps } from "react-native"
import styled, { css } from "styled-components/native"

const BaseTraits = withLocale({
  style: {
    default: {
      fontFamily: ArnoPro.bold
    },
    ko: {
      marginBottom: 5,
      fontFamily: SanCn.bold
    }
  }
})

export type InvestigatorTraitsProps = TextProps & Partial<PropsWithUnit>;

export const InvestigatorTraits: FC<InvestigatorTraitsProps> = styled(BaseTraits)`
  text-align: center;
  color: ${color.text};
  ${({ unit = 0 }: InvestigatorTraitsProps) => css`
    font-size: ${unit * boardText.ratio.traits}px;
  `}
`