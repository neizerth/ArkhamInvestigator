import { useAppSelector } from "@shared/lib";
import { useFonts } from "expo-font";
import { useMemo } from "react";
import { getLocaleFonts } from "../getLocaleFonts";
import { selectCurrentLanguage } from "../store";

export const useAppFonts = () => {
	const language = useAppSelector(selectCurrentLanguage);

	const fonts = useMemo(() => getLocaleFonts(language), [language]);

	return useFonts(fonts);
};
