import { useAppDispatch } from "@shared/lib";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { routeChanged } from "../store";

export const useRouteChanges = () => {
	const dispatch = useAppDispatch();

	const pathname = usePathname();

	useEffect(() => {
		dispatch(routeChanged(pathname));
	}, [dispatch, pathname]);
};
