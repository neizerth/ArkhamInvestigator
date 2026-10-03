import { useAppDispatch } from "@shared/lib";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect } from "react";
import {
	getOrientationType,
	setScreenOrientation,
	setScreenOrientationType,
} from "../../../../shared/lib";

export const useScreenOrientation = () => {
	const dispatch = useAppDispatch();

	const setOrientation = useCallback(
		(nextOrientation: ScreenOrientation.Orientation) => {
			const orientationType = getOrientationType(nextOrientation);

			dispatch(setScreenOrientation(nextOrientation));
			dispatch(setScreenOrientationType(orientationType ?? null));
		},
		[dispatch],
	);

	useEffect(() => {
		ScreenOrientation.getOrientationAsync().then(setOrientation);

		const subscription = ScreenOrientation.addOrientationChangeListener(
			({ orientationInfo }) => {
				setOrientation(orientationInfo.orientation);
			},
		);

		return () => {
			subscription.remove();
		};
	}, [setOrientation]);
};
