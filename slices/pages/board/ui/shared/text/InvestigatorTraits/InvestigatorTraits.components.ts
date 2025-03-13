import { withLocale } from "@features/i18n"
import { boardText } from "@pages/board/config"
import { color } from "@shared/config"
import { ArnoPro } from "@shared/fonts/ArnoPro"
import { SanCn } from "@shared/fonts/SanCn"
import type { FC } from "react"
import styled, { css } from "styled-components/native"
import type { InvestigatorTraitsProps } from "./InvestigatorTraits.types"

const LocaleTraits = withLocale({
  style: {
    default: {
      
    },
    ko: {
      
    }
  }
})

export const Traits: typeof LocaleTraits = styled(LocaleTraits)`
  text-align: center;
  color: ${color.text}
`