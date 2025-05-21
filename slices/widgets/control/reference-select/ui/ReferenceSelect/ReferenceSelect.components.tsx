import { HapticSelect } from "@features/haptic";
import { color, font, size } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { GameText } from "../../../../game/game-text";
import { StoreTabs } from "../../../../navigation/store-tabs";
import { StoreCheckbox } from "../../../store-checkbox";
import { StoreSelect as BaseStoreSelect } from "../../../store-select";
import { ReferenceCardSelect } from "../ReferenceCardSelect";
import { ReferenceStorySelect } from "../ReferenceStorySelect";

export const Container: typeof ScrollView = styled(ScrollView)`

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

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.small}px ${size.gap.default}px;
  gap: ${size.gap.small}px;
  align-items: center;
`;

export const ItemText: typeof Text = styled(Text)`
  
`;

export const ItemIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
  text-align: center;
  width: 24px;
`;

export const FFG: typeof Icon = styled(Icon)`
  color: ${color.ffg.light};
`;

export const EnIcon: typeof Icon = styled(Icon)`
  color: ${color.gray20};
  text-align: center;
`;

export const ReferenceText: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;
