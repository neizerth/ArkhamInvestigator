import {
	decreaseCurrentStat,
	selectCurrentStatValue,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { setCurrentStat } from "@shared/lib/store/features/board/actions/stats/current/setCurrentStat";
import type { ImageBackgroundProps } from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback } from "react";
import * as C from "./Resources.components";

export type ResourcesProps = ImageBackgroundProps;

const resourcesData = range(0, 101);

export const Resources = ({ ...props }: ResourcesProps) => {
	const dispatch = useAppDispatch();
	const resources = useAppSelector(selectCurrentStatValue("resources"));
	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat("resources", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setCurrentStat("resources", 0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("resources", 0));
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Picker
				value={resources}
				data={resourcesData}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};
