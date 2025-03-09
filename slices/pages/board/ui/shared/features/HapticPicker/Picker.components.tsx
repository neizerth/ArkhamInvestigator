import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import WheelPicker from '@quidone/react-native-wheel-picker';
import { size } from "@shared/config";


export const Picker: typeof WheelPicker = styled(WheelPicker)
  .attrs({
    contentContainerStyle: {
    }
  })`
    overflow: hidden
  `

export const Item: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
` 