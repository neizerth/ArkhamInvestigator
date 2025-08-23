import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { useAppDispatch, useAppSelector, useLayoutSize } from "@shared/lib";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { updateGameTextSize } from "../../../entities/description/lib/store/features";

const screen = Dimensions.get("screen");

export const useDescriptionLayout = (boardId: BoardId) => {
	const dispatch = useAppDispatch();

	const [size, onLayout] = useLayoutSize();
	const defaultValue = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "gameTextSize",
		}),
	);

	useEffect(() => {
		if (defaultValue || !size) {
			return;
		}
		dispatch(
			updateGameTextSize({
				boardId,
				value: size,
				view: screen,
			}),
		);
	}, [dispatch, size, defaultValue, boardId]);

	return onLayout;
};
