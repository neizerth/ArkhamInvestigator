import type { TouchableOpacityProps } from "@features/haptic";
import {
	selectCurrentStatValue,
	setCurrentStat,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import { Special } from "../Special";

export type AdditionalActionProps = TouchableOpacityProps;

export const AdditionalAction = (props: AdditionalActionProps) => {
	const dispatch = useAppDispatch();

	const additionalAction = useAppSelector(
		selectCurrentStatValue("additionalAction"),
	);

	const toggleAdditionalAction = useCallback(() => {
		dispatch(setCurrentStat("additionalAction", !additionalAction));
	}, [dispatch, additionalAction]);

	return (
		<Special
			{...props}
			icon="investigator"
			value={additionalAction}
			onPress={toggleAdditionalAction}
		/>
	);
};
