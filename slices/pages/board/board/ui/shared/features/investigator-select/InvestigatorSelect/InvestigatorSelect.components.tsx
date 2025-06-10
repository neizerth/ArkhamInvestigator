import { TouchableOpacity } from "@modules/core/haptic/shared/ui";
import { color } from "@shared/config";
import { type DefinedIconProps, Icon } from "@shared/ui";
import { PickerMemo as BasePicker } from "@widgets/control/picker";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSelectItem } from "../InvestigatorSelectItem";

export const Container: typeof View = styled(View)`
  width: 60px;
  height: 88px;
  position: relative;
  z-index: 2;
`;

export const Value: typeof InvestigatorSelectItem = styled(
	InvestigatorSelectItem,
)`
  
`;

export const Content: typeof View = styled(View)`
  position: relative;
  z-index: 2;
`;

export const Picker: typeof BasePicker = styled(BasePicker).attrs({
	contentContainerStyle: {
		justifyContent: "center",
	},
	itemHeight: 60,
	listStyle: {
		borderRadius: 80,
	},
	gap: 48,
})`
  `;

export const Arrow: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
	align-items: center;
  height: 38px;
  /* background-color: red; */
`;
export const Up: typeof Arrow = styled(Arrow)`
  justify-content: flex-start;
  top: -5px;
`;

export const Down: typeof Arrow = styled(Arrow)`
  bottom: -28px;

	justify-content: flex-end;
`;

export const ArrowIcon: FC<DefinedIconProps> = styled(Icon)`
  color: ${color.white};
  font-size: 18px;
	line-height: 18px;
	position: relative;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const IconContainer: typeof View = styled(View)`
  transform: rotate(90deg);
`;

export const UpIcon: typeof ArrowIcon = styled(ArrowIcon).attrs({
	icon: "left-arrow",
})`
    
  `;

export const DownIcon: typeof ArrowIcon = styled(ArrowIcon).attrs({
	icon: "right-arrow",
})`
  `;
