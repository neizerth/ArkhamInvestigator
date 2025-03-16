import { useEffect } from "react"
import { useAppDispatch } from "../store/useAppDispatch";
import { loadCoreData, loadInvestigatorsMediaData } from "../../../lib/store/features/app/actions";
import { restoreTranslation } from "@features/i18n";

export const useAppData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadInvestigatorsMediaData());
    dispatch(loadCoreData());
    dispatch(restoreTranslation());
  }, [dispatch]);
}