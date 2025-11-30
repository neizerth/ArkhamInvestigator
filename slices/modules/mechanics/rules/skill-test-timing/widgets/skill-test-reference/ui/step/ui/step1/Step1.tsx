import { selectChaosBagSkillCheckType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { isBaseSkillType, useAppSelector } from "@shared/lib";
import * as C from "./Step1.components";

export const Step1 = () => {
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	if (!skillType || !isBaseSkillType(skillType)) {
		return null;
	}

	return <C.Icon skillType={skillType} />;
};
