import type { BoardId } from "@modules/board/base/shared/model";
import { getChaosBagTokenReferenceEffects } from "@modules/chaos-bag/effect/entities/lib";
import type { RootState } from "@shared/model";
import { selectChaosBagTokenReference } from "./selectChaosBagTokenReference";

export const selectBoardTokenReferenceEffects =
	(boardId: BoardId) => (state: RootState) => {
		const reference = selectChaosBagTokenReference(boardId)(state);
		return getChaosBagTokenReferenceEffects(reference);
	};
