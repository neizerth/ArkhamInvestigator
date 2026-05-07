import { color, font, size } from "@shared/config";
import {
	Button as BaseButton,
	Page as BasePage,
	Row as BaseRow,
	Section as BaseSection,
	ScrollView,
	type ScrollViewProps,
	TextView,
} from "@shared/ui";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { StoreSelect } from "@widgets/control/store-select";
import { TopBarButton } from "@widgets/navigation";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { PickerSettings } from "../PickerSettings";
import { SoundSettings } from "../SoundSettings";

export const Page: typeof BasePage = styled(BasePage).attrs({
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

export const BarButton: typeof TopBarButton = styled(TopBarButton).attrs({
	iconStyle: {
		fontSize: 18,
		lineHeight: 18,
		color: color.light10,
	},
})`
  align-items: flex-end;
`;

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
  align-items: center;
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.large}px;
`;

export const Rule: typeof View = styled(View)`
	flex: 1;
	height: 1px;
	background-color: ${color.dark30};
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
	justify-content: stretch;
`;

export const Label: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
		minWidth: 80,
	},
})`
  font-size: ${font.size.default}px;
  text-align: right;
`;

export const Select: typeof StoreSelect = styled(StoreSelect).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`

`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  flex: 1;
  justify-content: flex-end;
`;

export const Picker: typeof PickerSettings = styled(PickerSettings)`
  flex: 1;
`;

export const Sound: typeof SoundSettings = styled(SoundSettings)`
  flex: 1;
`;

type ContentProps = ScrollViewProps & {
	navbarHeight: number;
};

export const PageContent: FC<ContentProps> = styled(ScrollView)`
  flex: 1;
  padding: ${({ navbarHeight }: ContentProps) => `0px ${size.gap.medium}px ${navbarHeight}px ${size.gap.medium}px`};
  margin-bottom: ${size.gap.default}px;
`;
