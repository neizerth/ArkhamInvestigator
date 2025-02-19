import { View } from "react-native";
import { Icon, type IconProps } from "../Icon";
import type { FC } from "react";
import type { PropsWithSkill } from "@shared/model/ui";
import styled, { css } from "styled-components/native";
import { color } from "@shared/config";

export const Container: typeof View = styled(View)`
  position: relative;
`


export const Background: FC<IconProps & PropsWithSkill> = styled(Icon)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  ${({ skillType }: PropsWithSkill) => css`
    color: ${color.skill[skillType]};
  `}
`

export const Foreground: typeof Icon = styled(Icon)`
  position: relative;
  z-index: 2;
  color: white;
`