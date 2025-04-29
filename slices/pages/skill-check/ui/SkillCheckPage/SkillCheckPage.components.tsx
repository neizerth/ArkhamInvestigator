import { ChaosTokenRevealModal } from "@features/chaos-bag";
import { color } from "@shared/config";
import { ScreenView } from "@shared/ui";
import styled from "styled-components/native";
import { Keyboard as BaseKeyboard, SkillCheckHeader } from "../layout";
import { EvaluationMemo as Evaluation } from "../layout/evaluation";

export const Container: typeof ScreenView = styled(ScreenView)`
	background-color: ${color.dark40};
	flex: 1;
	position: relative;
`;

export const Keyboard: typeof BaseKeyboard = styled(BaseKeyboard)`

`;

export const Display: typeof Evaluation = styled(Evaluation)`
  flex: 1;
`;

export const Header: typeof SkillCheckHeader = styled(SkillCheckHeader)`

`;

export const ChaosBagModal: typeof ChaosTokenRevealModal = styled(
	ChaosTokenRevealModal,
)`
	position: absolute;
	z-index: 3;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;
