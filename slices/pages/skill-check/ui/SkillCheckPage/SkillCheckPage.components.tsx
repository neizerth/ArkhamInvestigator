import { View } from "react-native";
import styled from "styled-components/native";
import { Keyboard as BaseKeyboard } from "../layout";
import { keyboardColor } from "@pages/skill-check/config";
import { Evaluation } from "../layout/evaluation";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: flex-end;
  background-color: ${keyboardColor.background};
`

export const Keyboard: typeof BaseKeyboard = styled(BaseKeyboard)`

`

export const Display: typeof Evaluation = styled(Evaluation)`
  flex: 1;
`