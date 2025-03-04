import { TICK_PATTERN } from "@features/haptic";
import { color, size } from "@shared/config";
import { IconButton, IconButtonProps, Row } from "@shared/ui";
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
    pressHapticPattern: TICK_PATTERN,
    iconStyle: {
      color: color.dark10,
      fontSize: 42
    }
  })`
    opacity: 0.8;
  `

export const Hide: FC<Omit<IconButtonProps, 'icon'>> = styled(Button)
  .attrs({
    icon: 'right-arrow',
    iconStyle: {
      color: color.dark10,
      fontSize: 36
    }
  })`
    transform: rotate(90deg);
  `

export const Clear: FC<Omit<IconButtonProps, 'icon'>> = styled(Button)
  .attrs({
    icon: 'file-empty',
    iconStyle: {
      color: Color(color.dark10).lighten(0.3).toString(),
      fontSize: 34
    }
  })`

  `

export const Left: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
  align-items: center;
`