import type { Href } from "expo-router";
import { useCallback } from "react";
import { goToPage } from "../../store/effects/router";
import { useAppDispatch } from "../store";
import { setShowDescription } from "@shared/lib/store";

export const usePage = () => {
	const dispatch = useAppDispatch();

	return useCallback(
		(href: Href) => () => {
			dispatch(goToPage(href));
			dispatch(setShowDescription(false));
		},
		[dispatch],
	);
};
