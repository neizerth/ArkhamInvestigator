import type { SkillType } from "@shared/model";
import type { FC } from "react";
import styled from "styled-components/native";
import { Skill, type SkillProps } from "../../Skill";

type SkillWithIconProps = Omit<SkillProps, "type" | "icon" | "skillType">;

export const withSkillType = (skillType: SkillType): FC<SkillWithIconProps> => {
	const Component = styled(Skill).attrs({
		skillType,
	})`
      
    `;
	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithSkill(${displayName})`;

	return Component;
};
