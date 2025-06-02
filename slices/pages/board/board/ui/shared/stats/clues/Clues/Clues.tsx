import type { ImageBackgroundProps } from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/control/picker";
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
};

export const Clues = ({
	onChange: onChangeProp,
	onLongPress,
	onPress,
	value,
	data = cluesData,
	...props
}: CluesProps) => {
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
				data={data}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
