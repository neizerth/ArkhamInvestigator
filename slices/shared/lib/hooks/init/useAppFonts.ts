import fonts from "@shared/fonts"
import { useFonts } from "expo-font";
import { useAppSelector } from "../store";
import { selectLanguage } from "@features/i18n";
export const useAppFonts = () => {
  const language = useAppSelector(selectLanguage);

  const appFonts = Object.assign(
    {},
    fonts.common,
    fonts[language]
  )
  return useFonts(appFonts);
}