import type { PickerDecelerationType } from "@shared/model";
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
