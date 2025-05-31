import { ChaosBagContents } from "@features/game/chaos-bag";
import { Button } from "@features/haptic";
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
	gap: ${size.gap.default}px;
`;

export const ReferenceText: typeof Text = styled(Text)`
  
`;

export const ReferenceButton: typeof Button = styled(Button).attrs({
	textStyle: {
		fontSize: font.size.small,
	},
	iconStyle: {
		fontSize: 14,
	},
})`
	padding: 0;
`;
