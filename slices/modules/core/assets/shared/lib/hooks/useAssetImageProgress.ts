import { useAppSelector } from "@shared/lib";
import { selectAssetImagesCount, selectAssetImagesLoadedCount } from "../store";

export const useAssetImageProgress = () => {
	const total = useAppSelector(selectAssetImagesCount);
	const loaded = useAppSelector(selectAssetImagesLoadedCount);

	return Math.round(loaded / total) * 100;
};
