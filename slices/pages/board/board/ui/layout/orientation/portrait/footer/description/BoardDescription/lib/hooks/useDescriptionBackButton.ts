import {
	selectShowDescription,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { useBackButton } from "@modules/core/device/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useRoute } from "expo-router/react-navigation";
import { useCallback } from "react";

export const useDescriptionBackButton = () => {
	const dispatch = useAppDispatch();

	const route = useRoute();
	const showDescription = useAppSelector(selectShowDescription);

	const onBack = useCallback(() => {
		const isBoard = route.name === "board/index";
		if (showDescription && isBoard) {
			dispatch(setShowDescription(false));
			return true;
		}
		return false;
	}, [dispatch, showDescription, route]);

	useBackButton(onBack);
};
