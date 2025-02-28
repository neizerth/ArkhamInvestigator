import styled from "styled-components/native"
import { Row as BaseRow, Icon as BaseIcon } from "@shared/ui"
import { color, size } from "@shared/config"
import { View } from "react-native"
import { FC } from "react"

export const Container: typeof View = styled(View)`
  gap: 10px;
  padding: 10px;
`

export const Row: typeof BaseRow = styled(BaseRow)`
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`

type IconProps = Omit<typeof BaseIcon, 'icon'>

export const Icon: FC<IconProps> = styled(BaseIcon)`
  color: ${color.light10};
  font-size: 30px;
  text-shadow: 2px 2px 5px ${color.dark10};

  padding: 10px 15px;
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



