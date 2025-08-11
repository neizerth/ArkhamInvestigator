import {
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "@modules/chaos-bag/result/features/lib";
import { getChaosBagSkillCheckFailed } from "@modules/chaos-bag/result/shared/lib";
import { selectChaosBagRevealResult } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { useAppSelector } from "@shared/lib";
import { compact } from "ramda-adjunct";
import { useMemo } from "react";
import type { SkillCheckPickerItem } from "./SkillCheckResultPicker.types";

export type SkillCheckResultItem = {
	type: "success" | "fail";
	value: ChaosTokenValue;
	succeedBy: string | null;
};

export const useSkillCheckPickerData = () => {
	const result = useAppSelector(selectSkillCheckResult);
	const succeedBy = useAppSelector(selectSkillCheckSucceedByResult);
	const storeValue = useAppSelector(selectChaosBagRevealResult);

	const fail = getChaosBagSkillCheckFailed({
		succeedBy,
		result,
	});

	const data = useMemo((): SkillCheckPickerItem[] => {
		return compact([
			{
				type: "success",
				succeedBy: 0,
				value: "success",
			},
			typeof result === "number" && {
				type: fail ? "fail" : "success",
				succeedBy,
				value: result,
			},
			{
				type: "fail",
				succeedBy: 0,
				value: "fail",
			},
		]);
	}, [result, succeedBy, fail]);

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
