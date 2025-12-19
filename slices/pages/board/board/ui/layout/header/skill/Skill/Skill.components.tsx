import { PickerMemo as BasePicker } from "@modules/core/control/entities/picker/ui";
import { color } from "@shared/config";
import {
	Row as BaseRow,
	Value as BaseValue,
	IconNumber,
	SkillIcon,
} from "@shared/ui";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ValueContainer: typeof View = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 2;
`;

export const Check: typeof Pressable = styled(Pressable)`
  flex: 1;
  justify-content: stretch;
`;

export const Background: typeof View = styled(View)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Value: typeof IconNumber = styled(IconNumber)`
  color: ${color.text};
`;

export const ValueDiff: typeof View = styled(View)`
  position: absolute;
  z-index: 1;
`;

export const Diff: typeof BaseValue = styled(BaseValue)`

`;

export const Picker: typeof BasePicker = styled(BasePicker).attrs({
	contentContainerStyle: {
		justifyContent: "center",
	},
})`
  
  `;

export const Icon: typeof SkillIcon = styled(SkillIcon)`
`;

export const IconContainer: typeof View = styled(View)`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
`;
