import { GameText } from "@modules/core/theme/shared/ui";
import {
	ScenarioDifficultySelect,
	ScenarioDifficultyTokens,
} from "@modules/stories/entities/ui";
import { color, font, size } from "@shared/config";
import { Checkbox as BaseCheckbox, Button, Row } from "@shared/ui";
import { ScrollView } from "@shared/ui";
import { Dimensions, View } from "react-native";

import styled from "styled-components/native";
import { StoreCheckbox } from "../../../store-checkbox";
import { ReferenceCardSelect } from "../ReferenceCardSelect";
import { ReferenceStorySelect } from "../ReferenceStorySelect";

const screen = Dimensions.get("screen");

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Body: typeof View = styled(View)`
  
`;

export const Header: typeof View = styled(View)`
`;

export const ScrollArea: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		gap: size.gap.default,
	},
})`
  max-height: ${screen.height - 290}px;
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
  padding: 0 ${size.gap.small}px;
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox)`
  min-height: 40px;
  justify-content: flex-end;
`;

export const Check: typeof BaseCheckbox = styled(BaseCheckbox)`
  flex: 1;
  justify-content: flex-end;
`;

export const DifficultyTokens: typeof ScenarioDifficultyTokens = styled(
	ScenarioDifficultyTokens,
)`
`;

export const StorySelect: typeof ReferenceStorySelect = styled(
	ReferenceStorySelect,
)`
`;

export const CardSelect: typeof ReferenceCardSelect = styled(
	ReferenceCardSelect,
)`
`;

export const DifficultySelect: typeof ScenarioDifficultySelect = styled(
	ScenarioDifficultySelect,
)`
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

export const Actions: typeof Row = styled(Row)`
  padding: 0 ${size.gap.small}px;
  gap: ${size.gap.default}px;
`;

export const Cancel: typeof Button = styled(Button)`
  background-color: ${color.dark15};
  flex: 1;
`;

export const Ok: typeof Button = styled(Button).attrs({
	textStyle: {
		color: color.text,
	},
	iconStyle: {
		color: color.text,
	},
})`
  background-color: ${color.light10};
  flex: 1;
`;
