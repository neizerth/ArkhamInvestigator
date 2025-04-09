import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { getOrientationType } from "../../features";

export const useScreenOrientation = () => {
	const [orientation, setOrientation] =
		useState<ScreenOrientation.Orientation>();

	useEffect(() => {
		ScreenOrientation.getOrientationAsync().then(setOrientation);

		const subscription = ScreenOrientation.addOrientationChangeListener(
			({ orientationInfo }) => {
				setOrientation(orientationInfo.orientation);
			},
		);

		return () => {
			ScreenOrientation.removeOrientationChangeListener(subscription);
		};
	}, []);

	const type = getOrientationType(orientation);

	return {
		orientation,
		type,
	};
};
