import { selectPickerSize } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";

export const useActionsStyle = () => {
	const pickerSize = useAppSelector(selectPickerSize);
	const isSmall = pickerSize === "small";

	return {
		special: {
			left: isSmall ? 80 : 90,
		},
	};
};
