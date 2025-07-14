import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { selectChaosBagTokenValues } from "./selectChaosBagTokenValues";

type Options = {
	boardId: BoardId;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType =
	({ type, boardId }: Options) =>
	(state: RootState) => {
		const data = selectChaosBagTokenValues(boardId)(state);
		return data[type] || 0;
	};
