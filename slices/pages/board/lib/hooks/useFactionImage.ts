import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import type { FactionImages } from "@shared/model";
import { useFaction } from "./useFaction";

type ImagesSource = {
	default: FactionImages;
	parallel: FactionImages;
};

export const useFactionImage = (imagesSource: ImagesSource) => {
	const { isParallel } = useAppSelector(selectCurrentBoard);
	const { faction } = useFaction();

	const images = isParallel ? imagesSource.parallel : imagesSource.default;
	const source = images[faction];

	return source;
};
