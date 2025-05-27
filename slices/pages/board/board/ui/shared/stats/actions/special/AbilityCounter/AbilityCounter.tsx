import type { ViewProps } from "react-native";

import {
	selectAbilityCounter,
	setAbilityCounter,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { PickerChangeEvent } from "@widgets/control/picker";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import * as C from "./AbilityCounter.components";
import { getValueStyle } from "./AbilityCounter.style";
import { backgrounds } from "./backgrounds";
export type AbilityCounterProps = ViewProps & {
	ability: InvestigatorAbility;
	defaultValue?: number;
	min?: number;
	max?: number;
};

export const AbilityCounter = ({
	ability,
	defaultValue,
	min = 0,
	max = 99,
	...props
}: AbilityCounterProps) => {
	const dispatch = useAppDispatch();
	const { id } = ability;
	const source = backgrounds[id];
	const value = useAppSelector(selectAbilityCounter(id));

	const valueStyle = getValueStyle(id);

	const data = useMemo(() => {
		return range(min, max + 1);
	}, [min, max]);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setAbilityCounter(id, value));
		},
		[dispatch, id],
	);

	const decrease = useCallback(() => {
		if (value < 1) {
			return;
		}
		dispatch(setAbilityCounter(id, value - 1));
	}, [dispatch, id, value]);

	const reset = useCallback(() => {
		const value = defaultValue || 0;
		dispatch(setAbilityCounter(id, value));
	}, [dispatch, id, defaultValue]);

	return (
		<C.Container {...props} source={source}>
			<C.Counter
				valueStyle={valueStyle}
				value={value}
				data={data}
				onValueChanged={onChange}
				onPress={decrease}
				onLongPress={reset}
			/>
		</C.Container>
	);
};
