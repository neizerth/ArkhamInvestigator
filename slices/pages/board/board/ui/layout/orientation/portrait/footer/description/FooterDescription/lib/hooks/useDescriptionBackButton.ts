import { useRoute } from "@react-navigation/native";
import {
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
	useBackButton,
} from "@shared/lib";
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
