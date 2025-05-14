import {
	increaseCurrentStat,
	selectCurrentStatValue,
	setCurrentStat,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { DoomProps } from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./InvestigatorDoom.components";

const doomData = range(0, 101);

export type { DoomProps as InvestigatorDoomProps };

export const InvestigatorDoom = (props: DoomProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentStatValue("doom"));
	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setCurrentStat("doom", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setCurrentStat("doom", 0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(increaseCurrentStat("doom"));
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Picker
				value={value}
				data={doomData}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
