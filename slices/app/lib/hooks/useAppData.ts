import { restoreTranslation } from "@features/i18n";
import { closeModal } from "@features/modal";
import { loadInvestigatorsMediaData, useAppDispatch } from "@shared/lib";
import { useEffect } from "react";
import { loadAppData } from "../store/actions/loadAppData";

export const useAppData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadInvestigatorsMediaData());
		dispatch(loadAppData());
		dispatch(restoreTranslation());
		dispatch(closeModal());
	}, [dispatch]);
};
