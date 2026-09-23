import { useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import {
	selectAllowNegativeHealthAndSanity,
	selectShowDamageAndHorror,
} from "../store";

/** how far health and sanity may go past the base value when negatives are allowed */
const NEGATIVE_LIMIT = 20;

export type MainStatPickerOptions = {
	value: number;
	baseValue: number;
};

export type MainStatPicker = {
	/** picker items: stat values, or wounds when damage and horror are shown */
	data: number[];
	/** what the picker shows: the value itself or the wounds taken */
	value: number;
	/** the lowest item, which is the lower bound for decrementing */
	min: number;
	wounds: number;
	showWounds: boolean;
	/** turns a picked item back into the stat value */
	toValue: (picked?: number) => number;
};

/**
 * Picker data for health and sanity: both the board and the overview show either the
 * value or the wounds taken, with the same range rules.
 */
export const useMainStatPicker = ({
	value,
	baseValue,
}: MainStatPickerOptions): MainStatPicker => {
	const showWounds = useAppSelector(selectShowDamageAndHorror);
	const negative = useAppSelector(selectAllowNegativeHealthAndSanity);

	const wounds = Math.max(baseValue - value, 0);
	const maxValue = baseValue + 1;

	const data = useMemo(() => {
		const minValue = negative ? -NEGATIVE_LIMIT : 0;
		const maxWounds = negative ? NEGATIVE_LIMIT : maxValue;

		return showWounds ? range(0, maxWounds) : range(minValue, maxValue);
	}, [maxValue, showWounds, negative]);

	const toValue = useCallback(
		(picked = 0) => (showWounds ? baseValue - picked : picked),
		[showWounds, baseValue],
	);

	return {
		data,
		value: showWounds ? wounds : value,
		min: data[0],
		wounds,
		showWounds,
		toValue,
	};
};
