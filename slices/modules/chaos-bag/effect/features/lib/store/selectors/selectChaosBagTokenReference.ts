import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { mergeReferenceTokenEffects } from "@modules/chaos-bag/effect/entities/lib";
import { selectBoardTokenEffectModification } from "@modules/mechanics/chaos-bag/effect/entities/lib";
import { selectReferenceCardTokenEffects } from "@shared/lib";
import type { RootState } from "@shared/model";

export const selectChaosBagTokenReference =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const referenceTokens = selectReferenceCardTokenEffects(state);
		const modification = selectBoardTokenEffectModification(boardId)(state);
		const baseMerge = mergeReferenceTokenEffects(
			referenceTokens,
			board.investigator.tokens_reference,
		);
		const result = mergeReferenceTokenEffects(baseMerge, modification);
		return result;
	};
