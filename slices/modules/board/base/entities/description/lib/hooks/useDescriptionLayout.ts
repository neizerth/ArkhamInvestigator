import { selectBoardProp } from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector, useLayoutSize } from "@shared/lib";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { updateGameTextSize } from "../store/features";

const screen = Dimensions.get("screen");

export const useDescriptionLayout = () => {
	const dispatch = useAppDispatch();

	const [size, onLayout] = useLayoutSize();
	const defaultValue = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "gameTextSize",
		}),
	);

	useEffect(() => {
		if (defaultValue || !size) {
			return;
		}
		dispatch(
			updateGameTextSize({
				boardId: "current",
				value: size,
				view: screen,
			}),
		);
	}, [dispatch, size, defaultValue]);

	return onLayout;
};
