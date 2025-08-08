import {
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "@modules/chaos-bag/result/features/lib";
import { getChaosBagResultSign } from "@modules/chaos-bag/result/shared/lib";
import { selectChaosBagRevealResult } from "@modules/chaos-bag/reveal/base/shared/lib";
import { signedNumber, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import type { SkillCheckPickerItem } from "./SkillCheckResultPicker.types";

export const useSkillCheckPickerData = () => {
	const result = useAppSelector(selectSkillCheckResult);
	const succeedBy = useAppSelector(selectSkillCheckSucceedByResult);
	const value = useAppSelector(selectChaosBagRevealResult);

	const fail = succeedBy < 0 || result === "fail";

	const sign = getChaosBagResultSign(result);
	const succeedByValue = signedNumber(succeedBy, sign);

	const data = useMemo((): SkillCheckPickerItem[] => {
		return [
			{
				label: "success",
				value: "success",
			},
			{
				label: succeedByValue,
				value: result,
			},
			{
				label: "fail",
				value: "fail",
			},
		];
	}, [result, succeedByValue]);

	return {
		result,
		succeedBy,
		fail,
		data,
		value,
	};
};
