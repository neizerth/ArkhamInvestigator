import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { restoreTranslation } from "@modules/core/i18n/shared/lib";
import { closeModalInternal } from "@modules/core/modal/shared/base/lib";
import { loadInvestigatorsMediaData, useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { loadAppData } from "../store/actions/loadAppData";
import { useDeviceEffects } from "./device";
import { useAppEffects } from "./useAppEffects";

export const useAppInit = () => {
	const dispatch = useAppDispatch();

	useDeviceEffects();
	useAppEffects();

	useEffect(() => {
		dispatch(endChaosBagReveal());

		dispatch(loadInvestigatorsMediaData());
		dispatch(loadAppData());
		dispatch(restoreTranslation());
		dispatch(closeModalInternal());
	}, [dispatch]);
};
