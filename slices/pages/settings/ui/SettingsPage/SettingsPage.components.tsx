import { color, font, size } from "@shared/config";
import {
	Button as BaseButton,
	Row as BaseRow,
	Section as BaseSection,
	TextView,
} from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { StoreSelect } from "@widgets/control/store-select";
import { View } from "react-native";
import styled from "styled-components/native";
import { PickerSettings } from "../PickerSettings";
import { SoundSettings } from "../SoundSettings";

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
