import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import type { PropsWithFaction } from "@modules/faction/shared/model";
import { color, factionColor, size } from "@shared/config";
import { Icon, type IconProps, Radio, Text } from "@shared/ui";
import type { FC } from "react";
import { type TextProps, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  gap: ${size.gap.default}px;

  padding: ${size.gap.small}px;
  align-items: center;
`;

export const Control: typeof Radio = styled(Radio)`

`;

type ContentProps = PropsWithFaction & {
	selected: boolean;
};

const selectedProps = css<ContentProps>`
   ${({ faction, selected }: ContentProps) =>
			selected &&
			css`
    color: ${factionColor[faction].darkColor};
  `}
`;

export const IconContainer: typeof View = styled(View)`
  width: 30px;
  justify-content: center;
  align-items: center;
`;

type PackIconProps = IconProps & ContentProps;

export const PackIcon: FC<PackIconProps> = styled(Icon)`
  font-size: 24px;
  line-height: 24px;
  color: ${color.gray20};

  ${selectedProps};
`;

type TitleProps = TextProps & ContentProps;
export const Title: FC<TitleProps> = styled(Text)`
  ${selectedProps};
`;
