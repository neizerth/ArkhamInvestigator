import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useBackButton = (callback: () => undefined | boolean) => {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			callback,
		);
		return () => backHandler.remove();
	}, [callback]);
};
