import { size } from "@shared/config";
import type { ViewStyle } from "react-native";
import { useDescriptionHeight } from "../../../../../../lib";

export const useFooterStyle = () => {
	const descriptionHeight = useDescriptionHeight();

	const container: ViewStyle = {
		paddingBottom: descriptionHeight + size.gap.small,
	};

	return {
		container,
	};
};
