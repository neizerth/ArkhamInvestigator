import { addEventListener } from "@react-native-community/netinfo";
import { eventChannel } from "redux-saga";
import { networkInfoUpdated } from "../../shared/lib";

export const networkChannel = () => {
	return eventChannel((emit) => {
		const unsubscribe = addEventListener((state) => {
			emit(networkInfoUpdated(state));
		});

		return () => {
			unsubscribe();
		};
	});
};
