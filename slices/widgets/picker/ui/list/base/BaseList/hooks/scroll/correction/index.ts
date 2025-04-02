import { identity, pipe } from "ramda";
import { Platform } from "react-native";
import { useScrollBack } from "./useScrollBack";

const useAndroidCorrection = pipe(useScrollBack);

export default Platform.OS === "android" ? useAndroidCorrection : identity;
