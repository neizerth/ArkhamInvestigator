import { selectLanguage } from "@features/i18n";
import fonts from "@shared/fonts";
import { useFonts } from "expo-font";
import { useAppSelector } from "../store";
export const useAppFonts = () => {
	const language = useAppSelector(selectLanguage);

	const appFonts = Object.assign({}, fonts[language]);
	return useFonts(appFonts);
};
