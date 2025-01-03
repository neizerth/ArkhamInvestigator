import { Block, Image } from "@/components";
import { createResponsiveUnit } from "@/features/units/responsive";
import styled from "styled-components";
import { InvestigatorSkill } from "../InvestigatorSkill/InvestigatorSkill";
import { BACKGROUND_WIDTH } from "./constants";

const px = createResponsiveUnit({
  defaultValue: BACKGROUND_WIDTH,
  name: 'unit'
})

export const Background = styled(Image)`
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.8));
  width: 100%;
`

export const Container = styled(Block)`
  position: relative;
`


export const Skill = styled(InvestigatorSkill)`
  position: absolute;
  z-index: 1;
  top: ${px(12)};
`

export const Willpower = styled(Skill)`
  left: ${px(23)}
`

export const Intellect = styled(Skill)`
  left: ${px(143)}
`

export const Combat = styled(Skill)`
  left: ${px(263)}
`


export const Agility = styled(Skill)`
  left: ${px(383)}
`
