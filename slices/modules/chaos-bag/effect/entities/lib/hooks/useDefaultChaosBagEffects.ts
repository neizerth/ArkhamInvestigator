import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import { signedNumber, useAppSelector } from "@shared/lib";
import { fromPairs } from "ramda";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectDefaultChaosBagEffects } from "../store";

type Options = {
	tokenValues: ChaosTokenValues;
};

export const useDefaultChaosBagEffects = ({ tokenValues }: Options) => {
	const { t } = useTranslation();

	const defaultEffects = useAppSelector(selectDefaultChaosBagEffects);

	return useMemo(() => {
		const pairs = Object.entries(defaultEffects).map((pair) => {
			const [type, key] = pair as [ChaosTokenType, string];
			const value = tokenValues[type];

			const effect = t(key, {
				value: signedNumber(value || 0, "+"),
			});

			return [type, effect] as [ChaosTokenType, string];
		});

		return fromPairs(pairs);
	}, [t, defaultEffects, tokenValues]);
};
