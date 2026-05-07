import { size } from "@shared/config";
import { font } from "@shared/config";
import { color } from "@shared/config";
import {
	Button as BaseButton,
	Row as BaseRow,
	Section as BaseSection,
} from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { StoreCheckbox as BaseCheckbox } from "@widgets/control/store-checkbox";
import { View } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage).attrs({
	contentStyle: {
		paddingLeft: size.gap.default,
		paddingRight: size.gap.default,
	},
})`
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

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
  align-self: stretch;
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.large}px;
  width: 100%;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
	justify-content: stretch;
`;

export const Checkbox: typeof BaseCheckbox = styled(BaseCheckbox)`
  flex: 1;
`;
