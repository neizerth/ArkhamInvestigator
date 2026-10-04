import * as ScreenOrientation from "expo-screen-orientation";
import { type EventChannel, eventChannel } from "redux-saga";

export function createScreenOrientationChannel(): EventChannel<ScreenOrientation.Orientation> {
	return eventChannel((emit) => {
		ScreenOrientation.getOrientationAsync().then(emit);

		const subscription = ScreenOrientation.addOrientationChangeListener(
			({ orientationInfo }) => {
				emit(orientationInfo.orientation);
			},
		);

		return () => {
			subscription.remove();
		};
	});
}
