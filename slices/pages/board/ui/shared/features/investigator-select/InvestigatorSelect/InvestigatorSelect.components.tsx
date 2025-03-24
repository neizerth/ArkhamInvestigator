import { color, factionColor } from "@shared/config";
import { PropsWithFaction } from "@shared/model";
import { PickerMemo as BasePicker } from "@widgets/picker";
import { FC } from "react";
import { Image as BaseImage, ImageProps, TouchableOpacity, View } from "react-native";
import styled, { css } from "styled-components/native";
import { InvestigatorSelectItem } from "../InvestigatorSelectItem";
import { DefinedIconProps, Icon } from "@shared/ui";

export const Container: typeof View = styled(View)`
  width: 60px;
  height: 60px;
  position: relative;
`;

export const Value: typeof InvestigatorSelectItem = styled(
	InvestigatorSelectItem,
)`
  
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
  left: 0;
  right: 0;
  z-index: 0;
	justify-content: center;
	align-items: center;
`
export const Up: typeof Arrow = styled(Arrow)`
  top: -0px;
`

export const Down: typeof Arrow = styled(Arrow)`
  bottom: -45px;
`

export const ArrowIcon: FC<DefinedIconProps> = styled(Icon)`
  color: ${color.light10};
  font-size: 18px;
	line-height: 18px;
	position: relative;
`

export const UpIcon: typeof ArrowIcon = styled(ArrowIcon)
  .attrs({
    icon: 'left-arrow'
  })`
    transform: rotate(90deg);
  `

export const DownIcon: typeof ArrowIcon = styled(ArrowIcon)
  .attrs({
    icon: 'left-arrow'
  })`
    transform: rotate(-90deg);
  `