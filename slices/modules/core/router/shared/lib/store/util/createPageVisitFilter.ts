import type { Href } from "expo-router";
import { setCurrentRoute } from "../router";

export const createPageVisitFilter = (route: Href) => {
	return (action: unknown) => {
		if (!setCurrentRoute.match(action)) {
			return false;
		}
		return action.payload === route;
	};
};
