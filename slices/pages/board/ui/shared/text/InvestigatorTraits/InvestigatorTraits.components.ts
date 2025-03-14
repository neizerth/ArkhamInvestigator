import { withLocale } from "@features/i18n"
import { boardText } from "@pages/board/config"
import { color } from "@shared/config"
import { ArnoPro } from "@shared/fonts"
import { SanCn } from "@shared/fonts"
import type { FC } from "react"
import styled, { css } from "styled-components/native"
import type { InvestigatorTraitsProps } from "./InvestigatorTraits.types"
import { Text } from "react-native"

export const Traits: typeof Text = styled(Text)`
  text-align: center;
  color: ${color.text}
`