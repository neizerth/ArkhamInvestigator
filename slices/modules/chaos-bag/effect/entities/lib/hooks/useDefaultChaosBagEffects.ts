import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { useAppSelector } from "@shared/lib";
import { fromPairs } from "ramda";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectDefaultChaosBagEffects } from "../store";

export const useDefaultChaosBagEffects = () => {
	const { t } = useTranslation();

	const defaultEffects = useAppSelector(selectDefaultChaosBagEffects);

	return useMemo(() => {
		const pairs = Object.entries(defaultEffects).map((pair) => {
			const [type, key] = pair as [ChaosTokenType, string];
			return [type, t(key)] as [ChaosTokenType, string];
		});

		return fromPairs(pairs);
	}, [t, defaultEffects]);
};
