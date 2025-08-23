import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectTurnEnd } from "@modules/mechanics/round/entities/lib";
import { useAppSelector } from "@shared/lib";

export const useBackground = (boardId: BoardId) => {
	const image = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "image",
		}),
	);

	const layout = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "imageLayout",
		}),
	);

	const turnEnd = useAppSelector(selectTurnEnd(boardId));

	if (!layout) {
		return;
	}

	return {
		code: image.id,
		layout,
		grayscale: turnEnd,
	};
};
