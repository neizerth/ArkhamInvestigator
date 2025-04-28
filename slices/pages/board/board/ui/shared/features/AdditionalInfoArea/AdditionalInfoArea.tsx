import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import type { PressableProps } from "@features/haptic";
import { setShowAdditionalInformation, useAppDispatch } from "@shared/lib";
import { useCallback, useRef } from "react";
import * as C from "./AdditionalInfoArea.components";

export type AdditionalInfoAreaProps = PressableProps;

export const AdditionalInfoArea = (props: AdditionalInfoAreaProps) => {
	const dispatch = useAppDispatch();
	const timeout = useRef<NodeJS.Timeout>();

	const onShow = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(true));
		dispatch(setShowAdditionalInformation(true));

		clearTimeout(timeout.current);

		timeout.current = setTimeout(() => {
			dispatch(setShowAdditionalInformation(false));
		}, 1500);
	}, [dispatch]);

	const onHide = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(false));
		dispatch(setShowAdditionalInformation(false));
	}, [dispatch]);

	return <C.Container {...props} onPressIn={onShow} onPressOut={onHide} />;
};
