import { getKeyConfig } from "@shared/lib";
import type { ViewStyle } from "react-native";

export const getIconStyle = getKeyConfig<ViewStyle>({
	default: {},
	seal: {
		paddingBottom: 6,
	},
});
