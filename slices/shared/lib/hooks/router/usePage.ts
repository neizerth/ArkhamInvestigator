import { useCallback } from "react"
import { useAppDispatch } from "../store"
import { goToPage } from "../../store/effects/router";
import type { Href } from "expo-router";

export const usePage = () => {
  const dispatch = useAppDispatch();

  return useCallback((href: Href) => () => {
    dispatch(goToPage(href));
  }, [dispatch])
}