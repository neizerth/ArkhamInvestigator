import type { Href } from "expo-router";
import { useCallback } from "react";
import { goToPage, replacePageTo } from "../../store/effects/router";
import {
	selectShowDescription,
	setShowDescription,
} from "../../store/features/game/game";
import { delay } from "../../util";
import { useAppDispatch } from "../store/dispatch/useAppDispatch";
import { useAppSelector } from "../store/useAppSelector";

export const usePage = () => {
	const dispatch = useAppDispatch();
	const showDescription = useAppSelector(selectShowDescription);

	return useCallback(
		(href: Href, replace = false) =>
			async () => {
				if (showDescription) {
					dispatch(setShowDescription(false));
					await delay(150);
				}
				if (replace) {
					dispatch(replacePageTo(href));
				} else {
					dispatch(goToPage(href));
				}
			},
		[dispatch, showDescription],
	);
};
