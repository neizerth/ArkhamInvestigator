import type { InvestigatorSkillType } from "@shared/model";
import type { FC } from "react";
import styled from "styled-components/native";
import { Skill } from "../Skill";
import type { SkillProps } from "../Skill";

type DefinedSkillProps = Omit<SkillProps, "type">;

export const withSkillType = (
	type: InvestigatorSkillType,
): FC<DefinedSkillProps> =>
	styled(Skill).attrs({
		type,
	})`
    flex: 1;
  `;
