import { selectIsSkillCheckFailed } from "@modules/chaos-bag/result/entities/lib";
import { selectChaosBagSkillCheckFailed } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./Step6AfterTitle.components";

export const Step6AfterTitle = () => {
	const isFailed = useAppSelector(selectIsSkillCheckFailed);
	const isFixedFailed = useAppSelector(selectChaosBagSkillCheckFailed);

	const failed = isFixedFailed ?? isFailed;

	if (failed === null) {
		return null;
	}

	return (
		<C.Container>
			{failed ? <C.Fail type="autoFail" /> : <C.Success type="elderSign" />}
		</C.Container>
	);
};
