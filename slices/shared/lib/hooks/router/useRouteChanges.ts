import { usePathname } from "expo-router";
import { useEffect } from "react";
import { routeChanged } from "../../store/effects/router";
import { useAppDispatch } from "../store";

export const useRouteChanges = () => {
	const dispatch = useAppDispatch();

	const pathname = usePathname();

	useEffect(() => {
		dispatch(routeChanged(pathname));
	}, [dispatch, pathname]);
};
