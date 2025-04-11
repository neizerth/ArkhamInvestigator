import { restoreTranslation } from "@features/i18n";
import { closeModal } from "@features/modal";
import {
	loadInvestigatorSignatures,
	loadInvestigatorsMediaData,
	useAppDispatch,
} from "@shared/lib";
import { useEffect } from "react";
import { loadAppData } from "../store/actions/loadAppData";

export const useAppData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadInvestigatorsMediaData());
		dispatch(loadInvestigatorSignatures());
		dispatch(loadAppData());
		dispatch(restoreTranslation());
		dispatch(closeModal());
	}, [dispatch]);
};
