import fonts from "@assets/fonts";
import { loadAsync } from "expo-font";

export const preloadFontMap = () => loadAsync(fonts);
