import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectBoardIsInactive } from "@modules/mechanics/board/base/entities/lib";
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

	const inactive = useAppSelector(selectBoardIsInactive(boardId));

	if (!layout) {
		return;
	}

	return {
		code: image.id,
		layout,
		grayscale: inactive,
	};
};
