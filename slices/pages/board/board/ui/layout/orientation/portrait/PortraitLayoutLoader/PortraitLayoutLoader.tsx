import { BoardDescriptionLoader } from "@modules/board/base/features/init-board-description";
import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { DESCRIPTION_TEXT_UNIT_SIZE } from "../../../../../config";

export const PortraitLayoutLoader = () => {
	const boards = useAppSelector(selectInvestigatorBoards);
	return (
		<>
			{boards.map((board) => (
				<BoardDescriptionLoader
					key={board.id}
					boardId={board.id}
					unit={DESCRIPTION_TEXT_UNIT_SIZE}
				/>
			))}
		</>
	);
};
