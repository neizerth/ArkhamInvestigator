import { PickerMemo as BasePicker } from "@modules/core/control/entities/picker/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { type DefinedIconProps, Icon } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSelectItem } from "../InvestigatorSelectItem";

export const Container: typeof View = styled(View)`
  width: 60px;
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
  position: relative;
  z-index: 10;
	align-items: center;
  justify-content: center;
  height: 32px;
  /* background-color: red; */
`;
export const Up: typeof Arrow = styled(Arrow)`
`;

export const Down: typeof Arrow = styled(Arrow)`

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
