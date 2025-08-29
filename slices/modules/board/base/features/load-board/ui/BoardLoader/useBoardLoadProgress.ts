import {
	selectBoardsCount,
	selectLoadedBoardsCount,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";

export const useBoardLoadProgress = () => {
	const total = useAppSelector(selectBoardsCount);

	const loaded = useAppSelector(selectLoadedBoardsCount);

	return Math.round((loaded * 100) / total);
};
