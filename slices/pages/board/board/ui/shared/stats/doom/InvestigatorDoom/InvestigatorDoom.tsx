import {
	increaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import type { DoomStatBackground } from "@modules/core/theme/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { type ComponentProps, useCallback } from "react";
import * as C from "./InvestigatorDoom.components";

const doomData = range(0, 101);

type DoomProps = ComponentProps<typeof DoomStatBackground>;

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
