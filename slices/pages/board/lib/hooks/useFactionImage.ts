import {
	selectBoardProp,
	selectCurrentFaction,
	useAppSelector,
} from "@shared/lib";
import type { FactionImages } from "@shared/model";

type ImagesSource = {
	default: FactionImages;
	parallel: FactionImages;
};

export const useFactionImage = (imagesSource: ImagesSource) => {
	const isParallel = useAppSelector(selectBoardProp("isParallel"));
	const faction = useAppSelector(selectCurrentFaction);

	const images = isParallel ? imagesSource.parallel : imagesSource.default;
	const source = images[faction];

	return source;
};
