import { checkAppUpdates } from "@features/load-app-data";
import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { restoreTranslation } from "@modules/core/i18n/shared/lib";
import { closeModalInternal } from "@modules/core/modal/shared/base/lib";
import { clearSoundQueue } from "@modules/core/sound/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { useDeviceEffects } from "./device";
import { useAppEffects } from "./useAppEffects";

export const useAppInit = () => {
	const dispatch = useAppDispatch();

	useDeviceEffects();
	useAppEffects();

	useEffect(() => {
		dispatch(endChaosBagReveal());

		dispatch(checkAppUpdates());
		dispatch(restoreTranslation());
		dispatch(closeModalInternal());
		dispatch(clearSoundQueue());
	}, [dispatch]);
};
