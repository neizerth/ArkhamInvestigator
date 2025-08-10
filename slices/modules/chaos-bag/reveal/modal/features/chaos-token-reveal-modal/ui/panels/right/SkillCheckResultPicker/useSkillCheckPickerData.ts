import {
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "@modules/chaos-bag/result/features/lib";
import {
	getChaosBagResultSign,
	getChaosBagSkillCheckFailed,
} from "@modules/chaos-bag/result/shared/lib";
import { selectChaosBagRevealResult } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { signedNumber, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import type { SkillCheckPickerItem } from "./SkillCheckResultPicker.types";

export const useSkillCheckPickerData = () => {
	const result = useAppSelector(selectSkillCheckResult);
	const succeedBy = useAppSelector(selectSkillCheckSucceedByResult);
	const storeValue = useAppSelector(selectChaosBagRevealResult);

	const fail = getChaosBagSkillCheckFailed({
		succeedBy,
		result,
	});

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

	const value = getActualValue({
		currentValue: storeValue,
		defaultValue: result,
	});

	return {
		result,
		succeedBy,
		fail,
		data,
		value,
	};
};

const getActualValue = ({
	currentValue,
	defaultValue,
}: {
	currentValue: ChaosTokenValue | null;
	defaultValue: ChaosTokenValue | null;
}) => {
	if (currentValue === "fail" || currentValue === "success") {
		return currentValue;
	}

	if (!currentValue) {
		return defaultValue;
	}

	return defaultValue;
};
