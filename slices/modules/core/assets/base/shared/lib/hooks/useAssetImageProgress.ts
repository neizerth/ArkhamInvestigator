import { useAppSelector } from "@shared/lib";
import { selectAssetImagesCount, selectAssetImagesLoadedCount } from "../store";

export const useAssetImageProgress = () => {
	const total = useAppSelector(selectAssetImagesCount);
	const loaded = useAppSelector(selectAssetImagesLoadedCount);

	const progress = Math.round((loaded * 100) / total);

	return {
		total,
		loaded,
		progress,
	};
};
