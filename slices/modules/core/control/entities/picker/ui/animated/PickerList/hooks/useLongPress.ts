import { useCallback, useState } from "react";
import type { PickerListProps } from "../PickerList.types";

export const useLongPress = <T>(props: PickerListProps<T>) => {
	const {
		onLongPress: onLongPressProp,
		onUserDeactivated: onUserDeactivatedProp,
		onScrollDeactivated: onScrollDeactivatedProp,
	} = props;

	const [controlEnabled, setControlEnabled] = useState(true);
	const onLongPress = useCallback(() => {
		onLongPressProp?.();
		setControlEnabled(false);
	}, [onLongPressProp]);

	const onUserDeactivated = useCallback(() => {
		setControlEnabled(true);
		onUserDeactivatedProp?.();
	}, [onUserDeactivatedProp]);

	// a long press interrupted by a scroll never reaches onUserDeactivated,
	// so the end of the scroll releases the lock as well
	const onScrollDeactivated = useCallback(() => {
		setControlEnabled(true);
		onScrollDeactivatedProp?.();
	}, [onScrollDeactivatedProp]);

	return {
		...props,
		onLongPress,
		onUserDeactivated,
		onScrollDeactivated,
		controlEnabled,
	};
};
