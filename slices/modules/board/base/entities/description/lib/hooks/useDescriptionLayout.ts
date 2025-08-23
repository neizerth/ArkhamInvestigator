import { selectBoardProp } from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector, useLayoutSize } from "@shared/lib";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { updateGameTextHeight } from "../store/features";

const screen = Dimensions.get("screen");

export const useDescriptionLayout = () => {
	const dispatch = useAppDispatch();

	const [size, onLayout] = useLayoutSize();
	const defaultValue = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "gameTextHeight",
		}),
	);
	const value = Math.round(size?.height ?? 0);

	useEffect(() => {
		if (defaultValue) {
			return;
		}
		dispatch(
			updateGameTextHeight({
				boardId: "current",
				value,
				view: screen,
			}),
		);
	}, [dispatch, value, defaultValue]);

	return onLayout;
};
