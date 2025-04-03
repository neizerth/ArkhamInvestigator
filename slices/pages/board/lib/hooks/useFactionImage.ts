import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import type { FactionImages } from "@shared/model";
import { useFaction } from "./useFaction";

type ImagesSource = {
	default: FactionImages;
	parallel: FactionImages;
};

export const useFactionImage = (imagesSource: ImagesSource) => {
	const board = useAppSelector(selectCurrentBoard);
	const { isParallel } = board;
	const { faction } = useFaction(board);

	const images = isParallel ? imagesSource.parallel : imagesSource.default;
	const source = images[faction];

	return source;
};
