import { selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import { selectBoardTokenEffectModification } from "@modules/mechanics/chaos-bag/effect/entities/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import {
	selectReferenceCardEffects,
	useDefaultChaosBagEffects,
} from "../../entities/lib";
import { selectSignatureEffects } from "./selectSignatureEffects";

type Options = PropsWithBoardId & {
	tokenValues: ChaosTokenValues;
};
export const useChaosBagTokenEffects = ({ boardId, tokenValues }: Options) => {
	const defaultEffects = useDefaultChaosBagEffects({ tokenValues });
	const referenceCardEffects = useAppSelector(selectReferenceCardEffects);
	const signatureEffects = useAppSelector(selectSignatureEffects(boardId));
	const board = useAppSelector(selectBoardById(boardId));

	const modification = useAppSelector(
		selectBoardTokenEffectModification(boardId),
	);

	return useMemo(() => {
		return modification({
			defaultEffects,
			referenceCardEffects,
			signatureEffects,
			tokenValues,
			board,
		});
	}, [
		defaultEffects,
		referenceCardEffects,
		signatureEffects,
		tokenValues,
		modification,
		board,
	]);
};
