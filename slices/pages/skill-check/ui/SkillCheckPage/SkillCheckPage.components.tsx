import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { Keyboard as BaseKeyboard, SkillCheckHeader } from "../layout";
import { Evaluation } from "../layout/evaluation";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: flex-end;
  background-color: ${color.dark40};
`;

export const Keyboard: typeof BaseKeyboard = styled(BaseKeyboard)`

`;

export const Display: typeof Evaluation = styled(Evaluation)`
  flex: 1;
`;

export const Header: typeof SkillCheckHeader = styled(SkillCheckHeader)`

`;
