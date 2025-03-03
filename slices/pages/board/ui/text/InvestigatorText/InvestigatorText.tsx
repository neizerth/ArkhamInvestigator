import { font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { PropsWithUnit } from "@shared/model"
import { GameText, GameTextProps } from "@widgets/game-text"
import { FC } from "react"
import styled, { css } from "styled-components/native"
import { boardText } from '../../../config/text'

export type InvestigatorTextProps = GameTextProps & Partial<PropsWithUnit>

export const InvestigatorText: FC<InvestigatorTextProps> = styled(GameText)
  .attrs(({ unit }: InvestigatorTextProps) => ({
    componentStyles: {
      i: {
        fontFamily: ArnoPro.italic
      },
      b: {
        fontFamily: ArnoPro.bold
      },
      keyword: {
        fontFamily: ArnoPro.boldItalic
      },
      icon: {
        fontSize: unit && unit * boardText.ratio.icon
      }
    }
  }))`
    font-family: ${ArnoPro.regular};
    ${({ unit }: InvestigatorTextProps) => unit && css`
      font-size: ${unit * boardText.ratio.text}px;
      line-height: ${unit * boardText.ratio.text * 1.15}px;
    `}
  `
