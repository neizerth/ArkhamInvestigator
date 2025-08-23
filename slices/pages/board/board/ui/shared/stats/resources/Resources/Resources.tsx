import { selectShowUpkeepResources } from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppSelector } from "@shared/lib";
import type { ImageBackgroundProps } from "@shared/ui";
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
const upkeepData = range(0, 21);

export const Resources = ({
	onChange: onChangeProp,
	onPress,
	onLongPress,
	value,
	...props
}: ResourcesProps) => {
	const showUpkeepResources = useAppSelector(selectShowUpkeepResources);
	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			onChangeProp?.(value);
		},
		[onChangeProp],
	);

	return (
		<C.Container {...props}>
			{showUpkeepResources && (
				<C.UpkeepResources data={upkeepData} zeroSign="+" />
			)}
			<C.Content>
				<C.Picker
					value={value}
					data={resourcesData}
					onValueChanged={onChange}
					onLongPress={onLongPress}
					onPress={onPress}
				/>
			</C.Content>
		</C.Container>
	);
};
