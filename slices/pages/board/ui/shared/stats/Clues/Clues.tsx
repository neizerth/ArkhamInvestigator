import {
	decreaseCurrentStat,
	selectCurrentStatValue,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { setCurrentStat } from "@shared/lib";
import type { ClueProps } from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./Clues.components";

export const Clues = (props: ClueProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentStatValue("clues"));
	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat("clues", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setCurrentStat("clues", 0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("clues"));
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Picker
				value={value}
				data={range(0, 101)}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
