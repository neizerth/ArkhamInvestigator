import { selectRevealedTokenCountByType } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import type { ChaosTokenType } from "../../../model";

type TokenRecord = Partial<Record<ChaosTokenType, string>>;

export const useChaosBagFrostTokenReference = () => {
	const count = useAppSelector(selectRevealedTokenCountByType("frost"));
	const { t } = useAppTranslation();

	const frostTranslationKey =
		count === 1
			? "chaosToken.frost.first.effect"
			: "chaosToken.frost.second.effect";

	const frostTranslation = t(frostTranslationKey);

	return useMemo(() => {
		const data: TokenRecord = {
			frost: frostTranslation,
		};

		return data;
	}, [frostTranslation]);
};
