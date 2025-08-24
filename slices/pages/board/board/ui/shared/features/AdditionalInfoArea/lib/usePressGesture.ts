import { useTouchCallback } from "@modules/core/touch/shared/lib";
import {
	setShowAdditionalInformation as showInfo,
	useAppDispatch,
} from "@shared/lib";
import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";

export const usePressGesture = () => {
	const dispatch = useAppDispatch();

	const onPressIn = useCallback(() => {
		dispatch(showInfo(true));
	}, [dispatch]);

	const onPressOut = useCallback(() => {
		dispatch(showInfo(false));
	}, [dispatch]);

	const pressInCallback = useTouchCallback({
		touchType: "pressIn",
		callback: onPressIn,
	});

	const pressOutCallback = useTouchCallback({
		touchType: "pressOut",
		callback: onPressOut,
	});

	return Gesture.LongPress()
		.runOnJS(true)
		.onStart(pressInCallback)
		.onTouchesUp(pressOutCallback);
};
