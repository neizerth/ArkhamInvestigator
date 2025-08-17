import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";

type Options = {
	tokens: RevealedChaosBagToken[];
};

export const isAutoSuccess = ({ tokens }: Options) => {
	return tokens.some(({ value }) => value === "success");
};
