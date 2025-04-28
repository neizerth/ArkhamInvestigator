import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import type { PressableProps } from "@features/haptic";
import {
	delay,
	setShowAdditionalInformation,
	useAppDispatch,
} from "@shared/lib";
import { useCallback } from "react";
import * as C from "./AdditionalInfoArea.components";

export type AdditionalInfoAreaProps = PressableProps;

export const AdditionalInfoArea = (props: AdditionalInfoAreaProps) => {
	const dispatch = useAppDispatch();
	const showInfo = useCallback(
		(value: boolean) => () => {
			dispatch(setShowRevealChaosTokenModal(value));
			dispatch(setShowAdditionalInformation(value));

			return value;
		},
		[dispatch],
	);

	const onShow = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(true));
		dispatch(setShowAdditionalInformation(true));

		delay(1500).then(() => {
			dispatch(setShowAdditionalInformation(false));
		});
	}, [dispatch]);

	const onHide = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(false));
		dispatch(setShowAdditionalInformation(false));
	}, [dispatch]);
	return <C.Container {...props} onPressIn={onShow} onPressOut={onHide} />;
};
