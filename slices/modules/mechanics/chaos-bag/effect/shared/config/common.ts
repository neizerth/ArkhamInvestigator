import { Platform } from "react-native";

const ios = Platform.OS === "ios";
export const replaceCharacter = ios ? "←" : "↩";
