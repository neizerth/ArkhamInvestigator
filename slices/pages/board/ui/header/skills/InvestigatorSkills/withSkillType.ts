import type { InvestigatorSkillType } from "@shared/model";
import { Skill } from "../Skill";
import type { SkillProps } from "../Skill";
import type { FC } from "react";
import styled from "styled-components/native";

type DefinedSkillProps = Omit<SkillProps, 'skill'> 

export const withSkillType = (type: InvestigatorSkillType): FC<DefinedSkillProps> => 
  styled(Skill)
  .attrs({
    type
  })`
    flex: 1;
  `