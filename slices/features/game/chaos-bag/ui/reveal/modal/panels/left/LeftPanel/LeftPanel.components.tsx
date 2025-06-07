import { StatIcon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { SkillValuePicker } from "../SkillValuePicker";

export const Container: typeof View = styled(View)`
`;

export const Content: typeof View = styled(View)`
  padding: 13px 0;
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
