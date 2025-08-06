import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { I18NText } from "../../model";

export const useI18NText = () => {
	const { t } = useTranslation();

	return useCallback(
		(item: I18NText) => {
			if (typeof item === "string") {
				return t(item);
			}
			return t(item.i18nKey, item.data);
		},
		[t],
	);
};
