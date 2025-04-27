import type { Href } from "expo-router";
import { useCallback } from "react";
import { setShowDescription } from "../../store";
import { goToPage, replacePageTo } from "../../store/effects/router";
import { useAppDispatch } from "../store";

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
