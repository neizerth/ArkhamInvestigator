import { font } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { withLocaleFont } from "@shared/lib/hoc"
import styled from "styled-components/native"

const BaseTraits = withLocaleFont({
  style: {
    default: {
      fontFamily: ArnoPro.bold
    }
  }
})

export const InvestigatorTraits: typeof BaseTraits = styled(BaseTraits)`
  font-size: ${font.size.default}px;
`