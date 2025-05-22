import { getChaosBagTokenRefence } from "@features/chaos-bag";
import type { ChaosTokenType } from "@features/chaos-bag/model";
import { selectReferenceCardText, useAppSelector } from "@shared/lib";
import { useMemo } from "react";

export const useTokenReference = () => {
	const text = useAppSelector(selectReferenceCardText) || "";

	const tokenReference = getChaosBagTokenRefence([text]);

	return useMemo(() => {
		return Object.entries(tokenReference).map((entry) => {
			const token = entry[0] as ChaosTokenType;
			const effect = entry[1];

			return {
				token,
				effect,
			};
		});
	}, [tokenReference]);
};
