import {
	increaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { DoomProps } from "@shared/ui";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./InvestigatorDoom.components";

const doomData = range(0, 101);

export type { DoomProps as InvestigatorDoomProps };

export const InvestigatorDoom = (props: DoomProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentActualPropValue("doom"));
	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setCurrentActualPropValue({
					prop: "doom",
					value,
				}),
			);
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			setCurrentActualPropValue({
				prop: "doom",
				value: 0,
			}),
		);
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(
			increaseCurrentActualPropValue({
				prop: "doom",
			}),
		);
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
