import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import type { PressableProps } from "@features/haptic";
import { setShowAdditionalInformation, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./AdditionalInfoArea.components";

export type AdditionalInfoAreaProps = PressableProps;

export const AdditionalInfoArea = (props: AdditionalInfoAreaProps) => {
	const dispatch = useAppDispatch();

	const handlePress = useCallback(
		(value: boolean) => () => {
			dispatch(setShowRevealChaosTokenModal(value));
			dispatch(setShowAdditionalInformation(value));
		},
		[dispatch],
	);

	return (
		<C.Container
			{...props}
			onPressIn={handlePress(true)}
			onPressOut={handlePress(false)}
		/>
	);
};
