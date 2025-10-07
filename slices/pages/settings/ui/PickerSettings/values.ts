import type {
	BoardPickerSize,
	PickerDecelerationType,
} from "@modules/core/control/entities/picker/model";
import type { SelectItem } from "@shared/ui";

export const decelerationValues: SelectItem<PickerDecelerationType>[] = [
	{
		label: "Default",
		value: "normal",
	},
	{
		label: "picker.deceleration.fast",
		value: "fast",
	},
	{
		label: "picker.deceleration.instant",
		value: false,
	},
];

export const boardPickerSizeValues: SelectItem<BoardPickerSize>[] = [
	{
		label: "picker.boardSize.small",
		value: "small",
	},
	{
		label: "picker.boardSize.medium",
		value: "medium",
	},
	{
		label: "picker.boardSize.large",
		value: "large",
	},
];
