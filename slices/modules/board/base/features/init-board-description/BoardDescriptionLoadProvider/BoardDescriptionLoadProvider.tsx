import { DESCRIPTION_TEXT_UNIT_SIZE } from "@modules/board/base/entities/description/config";
import { selectUnloadedBoardIds } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { BoardDescriptionLoader } from "../BoardDescriptionLoader";

export const BoardDescriptionLoadProvider = () => {
	const ids = useAppSelector(selectUnloadedBoardIds);
	const [boardId] = ids;

	if (!boardId) {
		return;
	}

	return (
		<BoardDescriptionLoader
			boardId={boardId}
			key={boardId}
			unit={DESCRIPTION_TEXT_UNIT_SIZE}
		/>
	);
};
