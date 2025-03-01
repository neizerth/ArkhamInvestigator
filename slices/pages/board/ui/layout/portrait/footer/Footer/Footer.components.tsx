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
  gap: ${size.gap.medium}px;
`

type IconProps = Omit<typeof BaseIcon, 'icon'>

export const Icon: FC<IconProps> = styled(BaseIcon)`
  color: ${color.light10};
  font-size: 30px;
  text-shadow: 2px 2px 5px ${color.dark10};

  padding: ${size.gap.default}px ${size.gap.medium}px;
`

export const Undo: FC<IconProps> = styled(Icon)
  .attrs({
    icon: 'undo'
  })`
    
  `

export const Redo: FC<IconProps> = styled(Icon)
  .attrs({
    icon: 'redo'
  })`
    font-size: 24px;
  `

export const Menu: FC<IconProps> = styled(Icon)
  .attrs({
    icon: 'menu'
  })`
  `

export const Description = styled(FooterDescription)`
  height: ${PORTRAIT_DESCRIPTION_HEIGHT}px;
`
