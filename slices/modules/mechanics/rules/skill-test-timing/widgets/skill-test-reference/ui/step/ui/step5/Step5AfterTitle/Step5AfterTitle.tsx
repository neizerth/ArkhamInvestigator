import { selectSkillCheckResult } from "@modules/chaos-bag/result/entities/lib";
import { selectChaosBagSkillCheckType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { isBaseSkillType, useAppSelector } from "@shared/lib";
import { isNotNil } from "ramda";
import * as C from "./Step5AfterTitle.components";

export const Step5AfterTitle = () => {
	const skillType = useAppSelector(selectChaosBagSkillCheckType);
	const value = useAppSelector(selectSkillCheckResult);

	if (!skillType || !isBaseSkillType(skillType) || !isNotNil(value)) {
		return null;
	}

	return (
		<C.Container>
			<C.Value skillType={skillType} value={value} scale={false} />
		</C.Container>
	);
};
