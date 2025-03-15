import { useEffect } from "react"
import { restoreTranslation, useAppFonts } from "@features/i18n";
import { loadCoreData, loadInvestigatorsMediaData, useAppDispatch } from "@shared/lib";

// import { loadCoreData, loadInvestigatorsMediaData } from "@shared/lib/store";

export const useAppData = () => {
  useAppFonts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadInvestigatorsMediaData());
    dispatch(loadCoreData());
    dispatch(restoreTranslation());
  }, [dispatch]);
}