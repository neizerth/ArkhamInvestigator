import type { Href } from "expo-router";
import { useCallback } from "react";
import { goToPage, replacePageTo } from "../../store/effects/router";
import { setShowDescription } from "../../store/features/game/game";
import { useAppDispatch } from "../store/dispatch/useAppDispatch";

export const usePage = () => {
	const dispatch = useAppDispatch();

	return useCallback(
		(href: Href, replace = false) =>
			() => {
				if (replace) {
					dispatch(replacePageTo(href));
				} else {
					dispatch(goToPage(href));
				}
				dispatch(setShowDescription(false));
			},
		[dispatch],
	);
};
