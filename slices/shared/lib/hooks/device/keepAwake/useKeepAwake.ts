import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";

export const useKeepAwake = (enabled: boolean) => {
	useEffect(() => {
		if (enabled) {
			activateKeepAwakeAsync();
			return;
		}
		deactivateKeepAwake();
	}, [enabled]);
};
