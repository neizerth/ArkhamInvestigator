import { selectBoardTokenReferenceEffects } from "@modules/chaos-bag/effect/features/lib/store/selectors";
import { useAppSelector } from "@shared/lib";
import type { BoardId } from "@shared/model";
import { useMemo } from "react";
// import { selectChaosBagTokenReferenceEffects } from "../../store";
import { useChaosBagBaseTokenReference } from "./useChaosBagBaseTokenReference";
import { useChaosBagFrostTokenReference } from "./useChaosBagFrostTokenReference";

type Options = {
	boardId: BoardId;
};

export const useChaosBagTokenReference = ({ boardId }: Options) => {
	const baseTokens = useChaosBagBaseTokenReference();
	const dynamicTokens = useChaosBagFrostTokenReference();
	const specialTokens = useAppSelector(
		selectBoardTokenReferenceEffects(boardId),
	);

	return useMemo(() => {
		return {
			...baseTokens,
			...dynamicTokens,
			...specialTokens,
		};
	}, [dynamicTokens, specialTokens, baseTokens]);
};
