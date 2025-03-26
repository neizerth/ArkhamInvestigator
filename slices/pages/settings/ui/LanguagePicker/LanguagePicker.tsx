import {
	changeLanguage,
	selectAvailableLanguages,
	selectLanguage,
} from "@features/i18n";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./LanguagePicker.components";

import { languageLabels } from "./labels";

import { useHapticFeedback } from "@features/haptic";
import type { SelectItem, SelectProps } from "@shared/ui";
import { propEq } from "ramda";
import type { ViewStyle } from "react-native";

export type LanguagePickerProps = Omit<
	SelectProps<string>,
	"data" | "value" | "onChange"
> & {
	contentContainerStyle?: ViewStyle;
};

type PickerItem = SelectItem<string>;

export const LanguagePicker = ({
	contentContainerStyle,
	...props
}: LanguagePickerProps) => {
	const dispatch = useAppDispatch();
	const languages = useAppSelector(selectAvailableLanguages);
	const language = useAppSelector(selectLanguage);

	const onChange = useCallback(
		({ value }: PickerItem) => {
			dispatch(changeLanguage(value));
		},
		[dispatch],
	);

	const items = languages
		.filter((language) => language !== "zh-cn")
		.map((language) => ({
			label: languageLabels[language],
			value: language,
		})) as PickerItem[];

	const value = items.find(propEq(language, "value"));

	return (
		<C.Container style={contentContainerStyle}>
			<C.Picker {...props} data={items} value={value} onChange={onChange} />
		</C.Container>
	);
};
