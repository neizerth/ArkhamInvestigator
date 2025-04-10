import {
	selectCurrentBoardProp,
	selectCurrentFaction,
	useAppSelector,
} from "@shared/lib";
import type { FactionImages } from "@shared/model";

type ImagesSource = {
	default: FactionImages;
	parallel: FactionImages;
};

export const useFactionImage = (imagesSource: ImagesSource) => {
	const isParallel = useAppSelector(selectCurrentBoardProp("isParallel"));
	const faction = useAppSelector(selectCurrentFaction);

	const images = isParallel ? imagesSource.parallel : imagesSource.default;
	const source = images[faction];

	return source;
};
