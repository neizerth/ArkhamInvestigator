import type { HapticMode } from "@modules/core/haptic/shared/model";
import type { SelectItem } from "@shared/ui";
import { Platform } from "react-native";

export const healthSanityModeValues = [
	{
		label: "Show health/sanity",
		value: false,
	},
	{
		label: "Show damage/horror",
		value: true,
	},
];

export const tapOnPinValues = [
	{
		label: "Default",
		value: false,
		hint: "tapOnPin.default",
	},
	{
		label: "Advanced",
		value: true,
		hint: "tapOnPin.advanced",
	},
];

export const turnEndValues = [
	{
		label: "No main & additional actions",
		value: true,
	},
	{
		label: "No main actions",
		value: false,
	},
];

const systemHaptic: SelectItem<HapticMode>[] =
	Platform.OS === "android"
		? [
				{
					label: "System (if available)",
					value: "system",
				},
			]
		: [];

export const hapticValues: SelectItem<HapticMode>[] = [
	{
		label: "Default",
		value: "default",
	},
	...systemHaptic,
	{
		label: "No",
		value: false,
	},
];

const languageLabels: Record<string, string> = {
	en: "English",
	es: "Español",
	de: "Deutsch",
	it: "Italiano",
	fr: "Français",
	ko: "한국어",
	// uk: "Українська",
	pl: "Polski",
	pt: "Português",
	ru: "Русский",
	vi: "Tiếng Việt",
	zh: "中文",
	"zh-cn": "简体中文",
};

export const languageValues: SelectItem<string>[] = Object.entries(
	languageLabels,
).map(([value, label]) => ({
	label,
	value,
}));
