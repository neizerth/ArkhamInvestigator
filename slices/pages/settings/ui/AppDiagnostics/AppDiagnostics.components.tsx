import { font, size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

import {
	Button as BaseButton,
	Row as BaseRow,
	Section as BaseSection,
} from "@shared/ui";

export const Container: typeof View = styled(View)`
  
`;

export const Section: typeof BaseSection = styled(BaseSection).attrs({
	bodyStyle: {
		gap: size.gap.default,
	},
})`
`;

export const Button: typeof BaseButton = styled(BaseButton).attrs({
	textStyle: {
		fontSize: font.size.default,
	},
})`
	flex: 1;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
	justify-content: stretch;
`;
