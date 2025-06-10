import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useMemo } from "react";
import type { ChaosTokenType } from "../../../model";

type TokenRecord = Partial<Record<ChaosTokenType, string>>;

export const useChaosBagBaseTokenReference = () => {
	const { t } = useAppTranslation();

	return useMemo(() => {
		const autoFailTranslation = t("chaosToken.autoFail.effect");
		const blessTranslation = t("chaosToken.bless.effect");
		const curseTranslation = t("chaosToken.curse.effect");

		const data: TokenRecord = {
			autoFail: autoFailTranslation,
			bless: blessTranslation,
			curse: curseTranslation,
		};

		return data;
	}, [t]);
};
