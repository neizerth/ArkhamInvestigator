import { color } from "@shared/config";
import { IconNumber, Row as BaseRow, TouchableOpacity } from "@shared/ui";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`

export const Row: typeof BaseRow = styled(BaseRow)`
  position: relative;
  align-items: stretch;
  justify-content: center;
  flex: 1;
`

export const ValueContainer: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Check: typeof Pressable = styled(Pressable)`
  flex: 1;
  justify-content: stretch;
`

export const Background: typeof View = styled(View)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const Value: typeof IconNumber = styled(IconNumber)
  .attrs({
    containerStyle: {
      justifyContent: 'flex-end'
    }
  })`
    color: ${color.text};
  `