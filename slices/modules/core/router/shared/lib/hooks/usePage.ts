import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { type GoToPagePayload, goToPage } from "../store";

export const usePage = () => {
	const dispatch = useAppDispatch();

	return useCallback(
		(payload: GoToPagePayload) => () => {
			dispatch(goToPage(payload));
		},
		[dispatch],
	);
};
