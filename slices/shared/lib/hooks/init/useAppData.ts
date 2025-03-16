import { useEffect } from "react"
import { useAppDispatch } from "../store/useAppDispatch";
import { loadCoreData, loadInvestigatorsMediaData } from "../../../lib/store/features/app/actions";
import { restoreTranslation } from "@features/i18n";
import { useAppFonts } from "./useAppFonts";

export const useAppData = () => {
  useAppFonts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadInvestigatorsMediaData());
    dispatch(loadCoreData());
    dispatch(restoreTranslation());
  }, [dispatch]);
}