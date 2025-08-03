import { initApp, useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { useDeviceEffects } from "./device";
import { useAppEffects } from "./useAppEffects";

export const useAppInit = () => {
	const dispatch = useAppDispatch();

	useDeviceEffects();
	useAppEffects();

	useEffect(() => {
		dispatch(initApp());
	}, [dispatch]);
};
