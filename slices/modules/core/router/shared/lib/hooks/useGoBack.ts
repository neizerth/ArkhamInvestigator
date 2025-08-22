import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { goBack } from "../store";

export const useGoBack = () => {
	const dispatch = useAppDispatch();

	return useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);
};
