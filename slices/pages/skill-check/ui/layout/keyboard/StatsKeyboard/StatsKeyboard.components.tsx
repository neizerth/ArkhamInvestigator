import { Row } from "@shared/ui"
import { ScrollView, View } from "react-native"
import styled from "styled-components/native"
import * as Buttons from "../KeyboardButton"
import { FC } from "react"
import { color, size } from "@shared/config"

export const Container: typeof ScrollView = styled(ScrollView)`
`

export const Content: typeof Row = styled(Row)`
  justify-content: center;
  align-items: center;
`

type ButtonProps = Omit<Buttons.IconButtonProps, 'size'>;

export const Button: FC<ButtonProps> = styled(Buttons.IconButton)
  .attrs({
    size: 'small',
    type: 'icon'
  })`
    align-items: center;
  `

export const Rule: typeof View = styled(View)`
  flex: 1;
  width: 1px;
  height: 20px;
  background-color: ${color.dark20};
  margin: 0 ${size.gap.small}px;
`