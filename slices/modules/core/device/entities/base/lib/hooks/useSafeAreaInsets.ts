import { setSafeAreaInsets } from "@modules/core/device/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { useSafeAreaInsets as useInsets } from "react-native-safe-area-context";

export const useSafeAreaInsets = () => {
	const insets = useInsets();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setSafeAreaInsets(insets));
	}, [insets, dispatch]);

	return insets;
};
