import { selectBoardProp } from "@modules/board/base/shared/lib/store/selectors/props/selectBoardProp";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

type Options = PropsWithBoardId & {
	id: string;
};

export const selectBoardHistoryItem =
	({ boardId, id }: Options) =>
	(state: RootState) => {
		const history = selectBoardProp({
			boardId,
			prop: "history",
		})(state);
		const data = history || [];

		return data.find(whereId(id));
	};
