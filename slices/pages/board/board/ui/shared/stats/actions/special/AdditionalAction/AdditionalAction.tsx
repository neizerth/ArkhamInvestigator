import {
	selectIsAdditionalActionUsed,
	setAdditionalActionUse,
} from "@modules/board/abilities/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { AbilityView } from "../AbilityView";

export type AdditionalActionProps = TouchableOpacityProps;

export const AdditionalAction = (props: AdditionalActionProps) => {
	const dispatch = useAppDispatch();

	const isUsed = useAppSelector(selectIsAdditionalActionUsed("current"));

	const toggleAdditionalAction = useCallback(() => {
		dispatch(
			setAdditionalActionUse({
				boardId: "current",
				canUse: isUsed,
			}),
		);
	}, [dispatch, isUsed]);

	return (
		<AbilityView
			{...props}
			icon="investigator"
			value={!isUsed}
			onPress={toggleAdditionalAction}
		/>
	);
};
