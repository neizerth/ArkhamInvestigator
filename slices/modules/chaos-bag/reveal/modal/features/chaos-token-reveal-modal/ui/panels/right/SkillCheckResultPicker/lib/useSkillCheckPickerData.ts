import {
	selectIsSkillCheckFailed,
	selectSkillCheckResult,
} from "@modules/chaos-bag/result/entities/lib";
import { selectChaosBagRevealResult } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { selectSkillCheckData } from "./selectSkillCheckPickerData";

export const useSkillCheckPickerData = () => {
	const currentResult = useAppSelector(selectSkillCheckResult);
	const storeValue = useAppSelector(selectChaosBagRevealResult);
	const failed = useAppSelector(selectIsSkillCheckFailed);

	const result = currentResult ?? 0;

	const data = useAppSelector(selectSkillCheckData);

	const value = storeValue ?? result;

	return {
		result,
		failed,
		data,
		value,
	};
};
