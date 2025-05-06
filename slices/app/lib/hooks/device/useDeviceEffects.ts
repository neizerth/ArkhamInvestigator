import { selectKeepAwake, useAppSelector, useKeepAwake } from "@shared/lib";

export const useDeviceEffects = () => {
	const keepAwakeEnabled = useAppSelector(selectKeepAwake);

	useKeepAwake(keepAwakeEnabled);
};
