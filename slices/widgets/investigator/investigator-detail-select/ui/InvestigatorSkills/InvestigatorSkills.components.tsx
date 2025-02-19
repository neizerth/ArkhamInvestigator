import { Row } from "@shared/ui"
import { Skill, type SkillProps } from "../Skill"
import styled from "styled-components/native"
import type { FC } from "react"
import { size } from "@shared/config"

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
`

type SkillWithIconProps = Omit<SkillProps, 'type'>;

export const createSkill = (type: string): FC<SkillWithIconProps> => 
  styled(Skill)
  .attrs({
    type
  })`
    
  `

export const Agility = createSkill('agility');
export const Combat = createSkill('combat');
export const Intellect = createSkill('intellect');
export const Willpower = createSkill('willpower');