import { font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { GameText } from "@widgets/game-text"
import styled from "styled-components/native"

export const InvestigatorText: typeof GameText = styled(GameText)
  .attrs({
    componentStyles: {
      i: {
        fontFamily: ArnoPro.italic
      },
      b: {
        fontFamily: ArnoPro.bold
      },
      keyword: {
        fontFamily: ArnoPro.boldItalic
      }
    }
  })`
    font-family: ${ArnoPro.regular};
    font-size: ${font.size.medium}px;
  `
