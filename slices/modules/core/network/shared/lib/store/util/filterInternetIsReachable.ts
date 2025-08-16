import { networkInfoUpdated } from "../actions";

export const filterInternetIsReachable =
	(isInternetReachable: boolean) => (action: unknown) => {
		if (!networkInfoUpdated.match(action)) {
			return false;
		}

		return action.payload.isInternetReachable === isInternetReachable;
	};
