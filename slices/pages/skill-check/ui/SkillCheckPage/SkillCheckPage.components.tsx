import { color } from "@shared/config";
import { ScreenView } from "@shared/ui";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Keyboard as BaseKeyboard, SkillCheckHeader } from "../layout";
import { EvaluationMemo as Evaluation } from "../layout/evaluation";

export const Container: typeof ScreenView = styled(ScreenView)`
	background-color: ${color.dark40};
	flex: 1;
`;

export const Keyboard: typeof BaseKeyboard = styled(BaseKeyboard)`

`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
  flex: 1;
`;

export const Display: typeof Evaluation = styled(Evaluation)`
  flex: 1;
`;

export const Header: typeof SkillCheckHeader = styled(SkillCheckHeader)`

`;
