import { useAppSelector } from "@shared/lib";
import {
	selectAssetDiskPath,
	selectAssetDownloadedSize,
	selectAssetSize,
} from "../store";

export const useAssetDownloadProgress = () => {
	const total = useAppSelector(selectAssetSize);
	const loaded = useAppSelector(selectAssetDownloadedSize);
	const progress = total && Math.round((loaded * 100) / total);
	const diskPath = useAppSelector(selectAssetDiskPath);

	return {
		diskPath,
		total,
		loaded,
		progress,
	};
};
