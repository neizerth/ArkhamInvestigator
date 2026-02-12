import { appStateChanged } from "@modules/core/app/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const subscription = AppState.addEventListener("change", (status) => {
			dispatch(appStateChanged(status));
		});

		return () => {
			subscription.remove();
		};
	}, [dispatch]);
};
