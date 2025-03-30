import { useCallback, useState } from "react";
import type { PickerListProps } from "../PickerList";

export const useLongPress = (props: PickerListProps) => {
	const {
		onLongPress: onLongPressProp,
		onUserDeactivated: onUserDeactivatedProp,
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

	return {
		...props,
		onLongPress,
		onUserDeactivated,
		controlEnabled,
	};
};
