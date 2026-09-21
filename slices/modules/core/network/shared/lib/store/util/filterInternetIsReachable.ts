import { internetReachabilityChanged } from "../actions";

export const filterInternetIsReachable =
	(isInternetReachable: boolean) => (action: unknown) => {
		if (!internetReachabilityChanged.match(action)) {
			return false;
		}

		return action.payload === isInternetReachable;
	};
