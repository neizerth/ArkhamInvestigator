import styled from "styled-components/native"
import { Row as BaseRow, Icon as BaseIcon } from "@shared/ui"
import { color, size } from "@shared/config"
import { View } from "react-native"
import type { FC } from "react"
import { FooterDescription } from "../FooterDescription"
import { PORTRAIT_DESCRIPTION_HEIGHT } from "@pages/board/config"

export const Container: typeof View = styled(View)`

`

export const Row: typeof BaseRow = styled(BaseRow)`
  justify-content: space-between;
  align-items: center;
`

export const Investigator: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
`

export const Stats: typeof Row = styled(Row)`
  padding: 0 0 0 ${size.gap.default}px;
`

export const MainStats: typeof Row = styled(Row)`
  position: relative;
  gap: ${size.gap.medium}px;
`

export const Description = styled(FooterDescription)`
  z-index: 4;
  height: ${PORTRAIT_DESCRIPTION_HEIGHT}px;
`
