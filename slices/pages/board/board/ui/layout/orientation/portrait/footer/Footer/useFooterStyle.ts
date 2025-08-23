import { selectDescriptionHeight } from "@modules/board/base/entities/description/lib";
import { navBarHeight, size } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import type { ViewStyle } from "react-native";

export const useFooterStyle = () => {
	const descriptionHeight = useAppSelector(selectDescriptionHeight("current"));

	const container: ViewStyle = {
		paddingBottom: descriptionHeight + size.gap.small + navBarHeight,
	};

	return {
		container,
	};
};
