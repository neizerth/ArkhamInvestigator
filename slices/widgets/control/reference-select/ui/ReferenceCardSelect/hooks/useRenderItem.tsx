import { DEFAULT_LANGUAGE, selectCurrentLanguage } from "@features/i18n";
import type { SelectItem } from "@shared/ui";
import type { ReferenceCard } from "arkham-investigator-data";
import { useCallback } from "react";

import { useAppSelector } from "@shared/lib";
import * as C from "../ReferenceCardSelect.components";

export const useRenderItem = () => {
	const language = useAppSelector(selectCurrentLanguage);

	return useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			const icon = value.icon || "book";
			const translated = language === value.locale;
			const isDefaultLanguage = language === DEFAULT_LANGUAGE;
			return (
				<C.Item>
					<C.ItemIcon icon={icon} />
					<C.ItemText>{value.name}</C.ItemText>
					{!isDefaultLanguage && !translated && <C.EnIcon icon="en" />}
				</C.Item>
			);
		},
		[language],
	);
};
