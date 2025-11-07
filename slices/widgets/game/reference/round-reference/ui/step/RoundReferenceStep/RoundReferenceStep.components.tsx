import { GameText } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { ReferenceSectionBackground } from "@modules/mechanics/rules/base/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { RoundReferenceStepContent } from "../RoundReferenceStepContent";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const StepButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
	z-index: 2;
`;

export const StepContent: typeof RoundReferenceStepContent = styled(
	RoundReferenceStepContent,
)`

`;

export const StepBackground: typeof ReferenceSectionBackground = styled(
	ReferenceSectionBackground,
).attrs({
	offsetX: "2.5%",
	rectWidth: "95%",
	height: "100%",
})`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
	opacity: 0.35;
`;

export const StepText: typeof GameText = styled(GameText)`
	
`;
