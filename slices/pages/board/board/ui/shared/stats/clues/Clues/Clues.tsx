import {
	selectSyncScenarioClues,
	setSyncScenarioClues,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { ImageBackgroundProps } from "@shared/ui";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./Clues.components";

const cluesData = range(0, 101);

export type CluesProps = ImageBackgroundProps & {
	value?: number;
	onChange?: (value?: number) => void;
	onLongPress?: () => void;
	onPress?: () => void;
	data?: number[];
	light?: boolean;
};

export const Clues = ({
	onChange: onChangeProp,
	onLongPress,
	onPress,
	value,
	data = cluesData,
	light = false,
	...props
}: CluesProps) => {
	const dispatch = useAppDispatch();
	const syncEnabled = useAppSelector(selectSyncScenarioClues);

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			onChangeProp?.(value);
		},
		[onChangeProp],
	);

	const toggleSync = useCallback(() => {
		dispatch(setSyncScenarioClues(!syncEnabled));
	}, [dispatch, syncEnabled]);

	const lockIcon = syncEnabled ? "icomoonfree-lock" : "unlocked";

	return (
		<C.Container {...props}>
			<C.Lock onPress={toggleSync}>
				<C.LockIcon enabled={syncEnabled} icon={lockIcon} light={light} />
			</C.Lock>
			<C.Picker
				value={value}
				data={data}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
