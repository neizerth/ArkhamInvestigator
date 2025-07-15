import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { useDefaultChaosBagEffects } from "../../entities/lib";
import { selectBoardTokenReferenceEffects } from "./selectBoardTokenReferenceEffects";

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
