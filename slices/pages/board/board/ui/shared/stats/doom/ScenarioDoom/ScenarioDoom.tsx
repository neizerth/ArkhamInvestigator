import { selectDoom, setDoom } from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { DoomProps } from "@shared/ui";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./ScenarioDoom.components";

const doomData = range(0, 101);

export const ScenarioDoom = (props: DoomProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectDoom);
	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setDoom(value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setDoom(0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		const doom = Math.max(0, value + 1);
		dispatch(setDoom(doom));
	}, [dispatch, value]);

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
