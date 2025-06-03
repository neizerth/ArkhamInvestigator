import type { BoardId } from "@shared/model";
import { useMemo } from "react";
import { useChaosBagBaseTokenReference } from "./useChaosBagBaseTokenReference";
import { useChaosBagFrostTokenReference } from "./useChaosBagFrostTokenReference";
import { useChaosBagSpecialTokenReference } from "./useChaosBagSpecialTokenReference";

type Options = {
	boardId?: BoardId;
};

export const useChaosBagTokenReference = (options?: Options) => {
	const baseTokens = useChaosBagBaseTokenReference();
	const dynamicTokens = useChaosBagFrostTokenReference();
	const specialTokens = useChaosBagSpecialTokenReference(options);

	return useMemo(() => {
		return {
			...baseTokens,
			...dynamicTokens,
			...specialTokens,
		};
	}, [dynamicTokens, specialTokens, baseTokens]);
};
