import { ChaosBagContents } from "@features/game/chaos-bag";
import { Button } from "@modules/haptic/shared/ui";
import { color, font, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { ContentPage } from "@widgets/content";
import styled from "styled-components/native";

export const Container: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
`;

export const Bag: typeof ChaosBagContents = styled(ChaosBagContents)`
	flex: 1;
`;

export const Reference: typeof Row = styled(Row)`
  padding: ${size.gap.default}px;
	align-items: center;
	gap: ${size.gap.large}px;
`;

export const ReferenceText: typeof Text = styled(Text)`
  
`;

const TopButton: typeof Button = styled(Button).attrs({
	textStyle: {
		fontSize: font.size.small,
		textAlign: "left",
	},
	iconStyle: {
		fontSize: 14,
	},
})`
`;

export const ReferenceButton: typeof TopButton = styled(TopButton)`
	flex: 1;
	padding: 0;
`;

export const SetupButton: typeof TopButton = styled(TopButton)`
	background-color: ${color.dark20};
	padding: 5px 10px;
`;
