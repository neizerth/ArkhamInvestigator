import { GameText } from "@entities/game-text";
import { Button, HapticSelect } from "@features/haptic";
import { color, font, size } from "@shared/config";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { StoreTabs } from "../../../../navigation/store-tabs";
import { StoreCheckbox } from "../../../store-checkbox";
import { StoreSelect as BaseStoreSelect } from "../../../store-select";
import { ReferenceCardSelect } from "../ReferenceCardSelect";
import { ReferenceStorySelect } from "../ReferenceStorySelect";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Body: typeof ScrollView = styled(ScrollView)`

`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
  padding: 0 ${size.gap.small}px;
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox)`
  justify-content: flex-end;
`;

export const SelectGroup: typeof View = styled(View)`
  
`;

export const Tabs: typeof StoreTabs = styled(StoreTabs)`
  
`;

export const Select: typeof HapticSelect = styled(HapticSelect)`
  background-color: ${color.dark30};
  border: 1px solid ${color.dark20};
`;

export const StorySelect: typeof ReferenceStorySelect = styled(
	ReferenceStorySelect,
)`
`;

export const CardSelect: typeof ReferenceCardSelect = styled(
	ReferenceCardSelect,
)`
`;

export const StoreSelect: typeof BaseStoreSelect = styled(BaseStoreSelect)`
  background-color: ${color.dark30};
  border: 1px solid ${color.dark20};
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

export const ReferenceText: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const ReferencePreview: typeof View = styled(View)`
  border: 1px solid ${color.light10};
  padding: ${size.gap.default}px;
  border-radius: ${size.borderRadius.default}px;
`;

export const Actions: typeof View = styled(View)`
  padding: 0 ${size.gap.small}px;
`;

export const Close: typeof Button = styled(Button).attrs({
	textStyle: {
		color: color.text,
	},
	iconStyle: {
		color: color.text,
	},
})`
  background-color: ${color.light10};
`;
