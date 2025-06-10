import { initChaosBag } from "@features/game/chaos-bag";
import { restoreTranslation } from "@modules/core/i18n/shared/lib";
import { closeModal } from "@modules/core/modal/shared/lib";
import { loadInvestigatorsMediaData, useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { loadAppData } from "../store/actions/loadAppData";
import { useDeviceEffects } from "./device";

export const useAppInit = () => {
	const dispatch = useAppDispatch();

	useDeviceEffects();

	useEffect(() => {
		dispatch(initChaosBag());
		dispatch(loadInvestigatorsMediaData());
		dispatch(loadAppData());
		dispatch(restoreTranslation());
		dispatch(closeModal());
	}, [dispatch]);
};
