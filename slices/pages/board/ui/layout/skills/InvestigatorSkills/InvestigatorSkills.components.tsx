import { InvestigatorSkillType } from "@shared/model";
import type { FC } from "react";
import type { ImageProps } from "react-native";
import { Image, View } from "react-native";
import styled, { css } from "styled-components/native";
import { Row } from "@shared/ui";
import { withSkillType } from "./withSkillType";
import { Skill as BaseSkill } from "../Skill";

export const Container: typeof View = styled(View)`
  position: relative;
`

export const Background: FC<ImageProps> = styled(Image)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`

export const Content: typeof Row = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Agility = withSkillType('agility');
export const Combat = withSkillType('combat');
export const Intellect = withSkillType('intellect');
export const Willpower = withSkillType('willpower');