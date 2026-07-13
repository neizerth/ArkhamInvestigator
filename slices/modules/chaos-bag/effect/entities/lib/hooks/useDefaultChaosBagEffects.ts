import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import { defaultChaosTokenValues } from "@modules/chaos-bag/value/shared/config";
import { getChaosTokenValueSymbol } from "@modules/chaos-bag/value/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { useAppSelector } from "@shared/lib";
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
			const value = (tokenValues[type] ??
				defaultChaosTokenValues[type as keyof typeof defaultChaosTokenValues] ??
				0) as ChaosTokenValue;

			const effect = t(key, {
				value: getChaosTokenValueSymbol(value),
			});

			return [type, effect] as [ChaosTokenType, string];
		});

		return fromPairs(pairs);
	}, [t, defaultEffects, tokenValues]);
};
