import { color } from "@shared/config";
import { Icon, StatIcon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { RevealMenu } from "../RevealMenu";
import { SkillValuePicker } from "../SkillValuePicker";
import { SkillValueSelect } from "../SkillValueSelect";

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
  z-index: 5;
`;

export const SkillTypeIcon: typeof StatIcon = styled(StatIcon)`
  font-size: 35px;
  line-height: 40px;
  color: white;
`;

export const SkillType: typeof View = styled(View)`
  position: absolute;
  top: -5px;
  right: -30px;
`;

export const Menu: typeof RevealMenu = styled(RevealMenu)`
  position: relative;
  left: -40px;
`;

export const ReferenceIcon: typeof Icon = styled(Icon)`
  color: ${color.gray20};
  font-size: 14px;
`;

export const SetType: typeof SkillValueSelect = styled(SkillValueSelect)`
  position: absolute;
  z-index: 1;
  top: 0px;
  right: -25px;
`;
