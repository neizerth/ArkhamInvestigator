import { Row } from "@shared/ui"
import styled from "styled-components/native"
import { size } from "@shared/config"
import { withSkillType } from "./withSkillType"

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
`


export const Agility = withSkillType('agility');
export const Combat = withSkillType('combat');
export const Intellect = withSkillType('intellect');
export const Willpower = withSkillType('willpower');