import type { HapticMode } from "@features/haptic";
import type { SelectItem } from "@shared/ui";

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

export const hapticValues: SelectItem<HapticMode>[] = [
	{
		label: "Default",
		value: "default",
	},
	{
		label: "System (if available)",
		value: "system",
	},
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
	"zh-cn": "中文 (zh-cn)",
};

export const languageValues: SelectItem<string>[] = Object.entries(
	languageLabels,
).map(([value, label]) => ({
	label,
	value,
}));
