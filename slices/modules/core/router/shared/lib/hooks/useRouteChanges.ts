import { useAppDispatch } from "@shared/lib";
import type { Href } from "expo-router";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { setCurrentRoute } from "../store";

export const useRouteChanges = () => {
	const dispatch = useAppDispatch();

	const pathname = usePathname();

	useEffect(() => {
		dispatch(setCurrentRoute(pathname as Href));
	}, [dispatch, pathname]);
};
