import { InvestigatorSkillType } from "@shared/model";
import type { FC } from "react";
import type { ImageProps } from "react-native";
import { Image, View } from "react-native";
import styled, { css } from "styled-components/native";
import { Skill, type SkillProps } from "../Skill";
import { Row } from "@shared/ui";

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

type DefinedSkillProps = Omit<SkillProps, 'skill'> 

const createSkill = (skill: InvestigatorSkillType): FC<DefinedSkillProps> => 
  styled(Skill)
  .attrs({
    skill
  })`
    flex: 1;
  `

export const Agility = createSkill('agility');
export const Combat = createSkill('combat');
export const Intellect = createSkill('intellect');
export const Willpower = createSkill('willpower');