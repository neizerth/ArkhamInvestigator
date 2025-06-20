import { useCallback } from "react";

import { selectCurrentLanguage } from "@features/i18n";
import { DEFAULT_LANGUAGE } from "@features/i18n/config";
import { useAppSelector } from "@shared/lib";
import type { Story } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import * as C from "../ReferenceStorySelect.components";

export const useRenderItem = () => {
	const language = useAppSelector(selectCurrentLanguage);

	return useCallback(
		({ value }: SelectItem<Story>) => {
			const icon = value.icon || "book";
			const translated = language === value.locale;
			const isDefaultLanguage = language === DEFAULT_LANGUAGE;
			return (
				<C.Item>
					<C.ItemIcon icon={icon} />
					<C.ItemText>{value.name}</C.ItemText>
					{value.official && <C.FFG icon="ffg" />}
					{!isDefaultLanguage && !translated && <C.EnIcon icon="en" />}
				</C.Item>
			);
		},
		[language],
	);
};
