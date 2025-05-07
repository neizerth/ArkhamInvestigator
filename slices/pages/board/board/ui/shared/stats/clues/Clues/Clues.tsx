import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./Clues.components";

const cluesData = range(0, 101);

type ClueProps = {
	value?: number;
	onChange?: (value?: number) => void;
	onLongPress?: () => void;
	onPress?: () => void;
};

export const Clues = ({
	onChange: onChangeProp,
	onLongPress,
	onPress,
	value,
	...props
}: ClueProps) => {
	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			onChangeProp?.(value);
		},
		[onChangeProp],
	);

	return (
		<C.Container {...props}>
			<C.Picker
				value={value}
				data={cluesData}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
