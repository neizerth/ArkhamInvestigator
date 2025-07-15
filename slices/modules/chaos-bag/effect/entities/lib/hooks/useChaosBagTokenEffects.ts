import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectBoardTokenReferenceEffects } from "@modules/chaos-bag/effect/features/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { useDefaultChaosBagEffects } from "./useDefaultChaosBagEffects";

type Options = PropsWithBoardId;
export const useChaosBagTokenEffects = ({ boardId }: Options) => {
	const defaultEffects = useDefaultChaosBagEffects();

	const referenceEffects = useAppSelector(
		selectBoardTokenReferenceEffects(boardId),
	);

	return useMemo(() => {
		return {
			...defaultEffects,
			...referenceEffects,
		};
	}, [defaultEffects, referenceEffects]);
};
