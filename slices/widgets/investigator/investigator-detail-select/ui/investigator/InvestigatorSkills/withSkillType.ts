import type { SkillProps } from "@pages/board";
import type { SkillType } from "@shared/model";
import styled from "styled-components/native";
import { Skill } from "../../Skill";
import type { FC } from "react";

type SkillWithIconProps = Omit<SkillProps, 'type' | 'icon' | 'skillType'>;

export const withSkillType = (skillType: SkillType): FC<SkillWithIconProps> => {
  const Component = styled(Skill)
    .attrs({
      skillType
    })`
      
    `
  const displayName = Component.displayName || Component.name;
  Component.displayName = `WithSkill(${displayName})`;

  return Component;
}
