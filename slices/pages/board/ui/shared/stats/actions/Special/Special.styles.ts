import { getKeyConfig } from "@shared/lib";
import type { ViewStyle } from "react-native";

export const getIconStyle = getKeyConfig<ViewStyle>({
	default: {},
	reaction: {
		paddingTop: 5,
	},
	investigator: {
		paddingTop: 5,
	},
});
