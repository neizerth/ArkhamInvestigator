import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import type { PressableProps } from "@features/haptic";
import { setShowAdditionalInformation, useAppDispatch } from "@shared/lib";
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
	return (
		<C.Container
			{...props}
			onPressIn={showInfo(true)}
			onPressOut={showInfo(false)}
		/>
	);
};
