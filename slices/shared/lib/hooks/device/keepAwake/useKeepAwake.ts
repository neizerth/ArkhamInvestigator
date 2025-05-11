import * as KeepAwake from "expo-keep-awake";
import { useEffect, useRef } from "react";

export const useKeepAwake = (enabled: boolean) => {
	const available = KeepAwake.isAvailableAsync();
	const active = useRef(false);

	useEffect(() => {
		if (!available) {
			return;
		}
		if (enabled === active.current) {
			return;
		}
		active.current = enabled;
		if (enabled) {
			KeepAwake.activateKeepAwakeAsync();
			return;
		}
		KeepAwake.deactivateKeepAwake();
	}, [enabled, available]);
};
