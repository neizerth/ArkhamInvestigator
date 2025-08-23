import {
	selectBoardProp,
	selectDescriptionTransition,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector, useLayoutSize } from "@shared/lib";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { updateGameTextHeight } from "../store/features";

const screen = Dimensions.get("screen");

export const useDescriptionLayout = () => {
	const dispatch = useAppDispatch();

	const [size, onLayout] = useLayoutSize();

	const showDescription = useAppSelector(selectShowDescription);
	const defaultValue = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "gameTextHeight",
		}),
	);
	const inTransition = useAppSelector(selectDescriptionTransition);
	const value = Math.round(size?.height ?? 0);

	const disabled = showDescription || inTransition;

	useEffect(() => {
		if (disabled || defaultValue === value || value === 0) {
			return;
		}
		dispatch(
			updateGameTextHeight({
				boardId: "current",
				value,
				view: screen,
			}),
		);
	}, [dispatch, disabled, value, defaultValue]);

	return onLayout;
};
