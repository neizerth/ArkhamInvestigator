import { color, font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { PropsWithUnit } from "@shared/model"
import { GameText, GameTextProps } from "@widgets/game-text"
import { FC } from "react"
import styled, { css } from "styled-components/native"
import { boardText } from '../../../../config/text'
import { withLocale } from "@features/i18n"
import { localeComponentStyles } from "./InvestigatorText.styles"
import { InvestigatorTextProps } from "./InvestigatorText.types"


export const BaseText: FC<InvestigatorTextProps> = withLocale({
  Component: GameText,
  props: {
    default: {
      componentStyles: localeComponentStyles.default
    },
    ko: {
      componentStyles: localeComponentStyles.ko
    }
  }
})


export const Text: FC<InvestigatorTextProps> = styled(BaseText)`
  font-family: ${ArnoPro.regular};
  color: ${color.text};
  ${({ unit }: InvestigatorTextProps) => {
    if (!unit) {
      return '';
    }
    const fontSize = unit * boardText.ratio.text;
    return css`
      font-size: ${fontSize}px;
      line-height: ${fontSize * 1.15}px;
    `}
  }
`
