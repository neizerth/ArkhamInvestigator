import { selectDescriptionHeight } from "@modules/board/base/entities/description/lib";
import { selectPickerSize } from "@modules/core/control/entities/picker/lib";
import type { PickerSize } from "@modules/core/control/entities/picker/model";
import { navBarHeight, size } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import type { ViewStyle } from "react-native";

const pickerSizeStyle: Record<PickerSize, ViewStyle> = {
	small: {
		paddingLeft: 5,
		paddingRight: 10,
	},
	medium: {},
};

export const useFooterStyle = () => {
	const descriptionHeight = useAppSelector(selectDescriptionHeight("current"));
	const pickerSize = useAppSelector(selectPickerSize);

	const style = pickerSizeStyle[pickerSize];

	const container: ViewStyle = {
		paddingBottom: descriptionHeight + size.gap.small + navBarHeight,
		...style,
	};

	return {
		container,
	};
};
