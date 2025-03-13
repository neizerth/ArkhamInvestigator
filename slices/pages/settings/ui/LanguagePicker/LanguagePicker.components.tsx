import { Picker as BasePicker } from "@widgets/picker";
import { View } from "react-native";
import styled from "styled-components/native";
import { FLAG_SIZE } from "./LanguagePicker.styles";
import { type DefinedIconProps, Icon, TouchableOpacity } from "@shared/ui";
import { color } from "@shared/config";
import type { FC } from "react";

export const Container: typeof View = styled(View)`
  align-items: center;
`

export const Control: typeof TouchableOpacity = styled(TouchableOpacity)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`

export const Arrow: FC<DefinedIconProps>  = styled(Icon)
  .attrs({
    icon: 'left-arrow'
  })`
    color: ${color.light10};
    font-size: 20px;
  `


export const ArrowTop: FC<DefinedIconProps> = styled(Arrow)`
  transform: rotate(90deg);
`

export const ArrowBottom: FC<DefinedIconProps> = styled(Arrow)`
  transform: rotate(-90deg);
`


export const Picker: typeof BasePicker = styled(BasePicker)
  .attrs({
    itemHeight: FLAG_SIZE,
    gap: 80,
    listStyle: {
      borderRadius: 24
    }
  })`
  `
