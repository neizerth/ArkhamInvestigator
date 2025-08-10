import {
	selectIsAdditionalActionUsed,
	setAdditionalActionUse,
} from "@modules/board/abilities/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { Special } from "../Special";

export type AdditionalActionProps = TouchableOpacityProps;

export const AdditionalAction = (props: AdditionalActionProps) => {
	const dispatch = useAppDispatch();

	const isUsed = useAppSelector(selectIsAdditionalActionUsed("current"));

	const toggleAdditionalAction = useCallback(() => {
		dispatch(
			setAdditionalActionUse({
				boardId: "current",
				use: isUsed,
			}),
		);
	}, [dispatch, isUsed]);

	return (
		<Special
			{...props}
			icon="investigator"
			value={!isUsed}
			onPress={toggleAdditionalAction}
		/>
	);
};
