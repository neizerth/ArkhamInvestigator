import { identity, pipe } from "ramda";
import { Platform } from "react-native";
import { useOverScrollBack } from "./useOverScrollBack";
import { useScrollBack } from "./useScrollBack";

const useAndroidCorrection = pipe(useScrollBack, useOverScrollBack);

export default Platform.OS === "android" ? useAndroidCorrection : identity;
