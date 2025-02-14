import { Platform } from "react-native";

export const HAVE_AVIF_SUPPORT = Platform.OS !== 'android' || (Platform.OS === 'android' && Platform.Version >= 12)