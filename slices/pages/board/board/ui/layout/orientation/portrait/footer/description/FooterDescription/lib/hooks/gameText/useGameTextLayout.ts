import {
	selectGameTextHeight,
	selectShowDescription,
	setGameTextHeight,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector, useLayoutSize } from "@shared/lib";
import { useEffect, useRef } from "react";

export const useGameTextLayout = () => {
	const dispatch = useAppDispatch();

	const [size, onLayout] = useLayoutSize();
	const gameTextHeight = useAppSelector(selectGameTextHeight);
	const showDescription = useAppSelector(selectShowDescription);

	const maxHeight = useRef(Number.POSITIVE_INFINITY);

	useEffect(() => {
		if (!size?.height) {
			return;
		}
		const height = Math.round(size.height);
		if (showDescription) {
			maxHeight.current = height;
			return;
		}
		if (height === gameTextHeight || height >= maxHeight.current) {
			return;
		}
		dispatch(setGameTextHeight(height));
	}, [dispatch, size?.height, gameTextHeight, showDescription]);

	return onLayout;
};
