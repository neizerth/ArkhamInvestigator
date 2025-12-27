import {
	selectShowAdditionalInformation,
	setShowAdditionalInformation,
} from "@modules/board/base/shared/lib";
import { useTouchCallback } from "@modules/core/touch/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";

export const usePressGestures = () => {
	const dispatch = useAppDispatch();

	const infoShown = useAppSelector(selectShowAdditionalInformation);

	const longPressCallback = useCallback(() => {
		dispatch(setShowAdditionalInformation(true));
	}, [dispatch]);

	const pressOutCallback = useCallback(() => {
		if (!infoShown) {
			return false;
		}
		dispatch(setShowAdditionalInformation(false));
	}, [dispatch, infoShown]);

	const onLongPress = useTouchCallback({
		touchType: "longPress",
		callback: longPressCallback,
	});

	const onPressOut = useTouchCallback({
		touchType: "pressOut",
		callback: pressOutCallback,
	});

	return {
		onLongPress,
		onPressOut,
	};
};
