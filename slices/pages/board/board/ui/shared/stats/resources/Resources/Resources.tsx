import type { ImageBackgroundProps } from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./Resources.components";

export type ResourcesProps = ImageBackgroundProps & {
	value?: number;
	onChange?: (value?: number) => void;
	onLongPress?: () => void;
	onPress?: () => void;
};

const resourcesData = range(0, 101);

export const Resources = ({
	onChange: onChangeProp,
	onPress,
	onLongPress,
	value,
	...props
}: ResourcesProps) => {
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
				data={resourcesData}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
