
import { color, size } from "@shared/config";
import { DefinedIconButtonProps, IconButton, IconButtonProps, Row } from "@shared/ui";
import Color from "color";
import { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
`

export const Button: typeof IconButton = styled(IconButton)
  .attrs({
    iconStyle: {
      color: color.dark10,
      fontSize: 42
    }
  })`
    opacity: 0.8;
  `

export const Hide: FC<DefinedIconButtonProps> = styled(Button)
  .attrs({
    icon: 'right-arrow',
    iconStyle: {
      color: color.dark10,
      fontSize: 36
    }
  })`
    transform: rotate(90deg);
  `

