import { Alegreya } from "@assets/fonts";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { Icon as BaseIcon, type DefinedIconProps, Row, Text } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`

`;

export const ContentRow: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

export const Left: typeof Row = styled(Row)`
  align-items: center;
`;

export const Right: typeof Row = styled(Row)`
  align-items: center;
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 26px;
  line-height: 26px;
  color: ${color.gray10};
`;

export const ThemeIcon: typeof Icon = styled(Icon)`
  color:rgb(198, 180, 147);
`;

export const InfoIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "info",
})`
  `;

export const SupportIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "heart",
})`
  `;

export const Hint: typeof Text = styled(Text)`
  padding-inline: ${size.gap.large}px;
  font-family: ${Alegreya.italic};
  color: ${color.gray10};
`;
