import { GameText } from "@modules/core/theme/shared/ui";
import { ReferenceSectionStep } from "@modules/mechanics/rules/base/shared/ui";
import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof ReferenceSectionStep = styled(
	ReferenceSectionStep,
)`
  padding: 7px 24px;
`;

export const Content: typeof View = styled(View)`
	padding: 7px 24px;
`;

export const StepText: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		icon: {
			top: 0,
		},
		icon_bullet: {
			top: -3,
		},
	},
})`
	color: ${color.text};
`;
