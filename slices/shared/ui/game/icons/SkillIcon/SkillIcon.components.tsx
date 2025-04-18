import { color } from "@shared/config";
import type { PropsWithSkill } from "@shared/model/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { Icon, type IconProps } from "../Icon";

export type PropsWithTheme = {
	dark?: boolean;
};

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Background: FC<IconProps & PropsWithSkill & PropsWithTheme> =
	styled(Icon)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  ${({ skillType, dark }: PropsWithSkill & PropsWithTheme) => css`
    color: ${color.skill[skillType][dark ? "dark" : "light"]};
  `}
`;

export const Foreground: typeof Icon = styled(Icon)`
  position: relative;
  z-index: 2;
  color: white;
`;
