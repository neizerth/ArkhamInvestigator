import { useEffect } from "react"
import { useAppDispatch } from "../store/useAppDispatch";
import { loadCoreData, loadInvestigatorsMediaData } from "@shared/lib/store";

export const useAppData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadInvestigatorsMediaData());
    dispatch(loadCoreData());
  }, [dispatch]);
}