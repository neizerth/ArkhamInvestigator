import { BoardDescriptionLoader } from "@modules/board/base/features/init-board-description";
import { selectBoardIds } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { DESCRIPTION_TEXT_UNIT_SIZE } from "../../../../../config";

export const PortraitLayoutLoader = () => {
	const boards = useAppSelector(selectBoardIds);
	return (
		<>
			{boards.map((boardId) => (
				<BoardDescriptionLoader
					key={boardId}
					boardId={boardId}
					unit={DESCRIPTION_TEXT_UNIT_SIZE}
				/>
			))}
		</>
	);
};
