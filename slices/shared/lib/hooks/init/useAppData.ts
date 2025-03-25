import { restoreTranslation } from "@features/i18n";
import { useEffect } from "react";
import {
	loadCoreData,
	loadInvestigatorsMediaData,
} from "../../../lib/store/features/app/actions";
import { useAppDispatch } from "../store/useAppDispatch";
import { closeModal } from "@features/modal";

export const useAppData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadInvestigatorsMediaData());
		dispatch(loadCoreData());
		dispatch(restoreTranslation());
		dispatch(closeModal());
	}, [dispatch]);
};
