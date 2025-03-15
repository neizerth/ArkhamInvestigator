import fonts from "@shared/fonts"
import { useFonts } from "expo-font";
import { selectLanguage } from "../store";
import { useAppSelector } from "@shared/lib";
export const useAppFonts = () => {
  const language = useAppSelector(selectLanguage);

  const appFonts = Object.assign(
    {},
    fonts[language]
  )
  return useFonts(appFonts);
}