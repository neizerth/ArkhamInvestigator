import { color } from "@shared/config";
import { Icon, StatIcon } from "@shared/ui";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SkillValuePicker } from "../SkillValuePicker";

export const Container: typeof View = styled(View)`
`;

export const Placeholder: typeof View = styled(View)`
`;

export const Content: typeof View = styled(View)`
  padding: 10px 0;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SkillValuePickerContainer: typeof View = styled(View)`
`;

export const SkillPicker: typeof SkillValuePicker = styled(
	SkillValuePicker,
).attrs({
	gap: 50,
})`
`;

export const SkillTypeIcon: typeof StatIcon = styled(StatIcon)`
  font-size: 35px;
  line-height: 40px;
  color: white;
`;

export const SkillType: typeof View = styled(View)`
  position: absolute;
  top: -3px;
  right: -25px;
`;

export const ReferenceButton: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
  border: 1px solid ${color.dark20};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

export const ReferenceIcon: typeof Icon = styled(Icon)`
  color: ${color.gray30};
  font-size: 14px;
`;
