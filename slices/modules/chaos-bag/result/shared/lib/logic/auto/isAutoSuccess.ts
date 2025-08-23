import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { includeChaosTokenInResult } from "../includeChaosTokenInResult";

type Options = {
	tokens: RevealedChaosBagToken[];
};

export const isAutoSuccess = ({ tokens }: Options) => {
	return tokens
		.filter(includeChaosTokenInResult)
		.some(({ value }) => value === "success");
};
