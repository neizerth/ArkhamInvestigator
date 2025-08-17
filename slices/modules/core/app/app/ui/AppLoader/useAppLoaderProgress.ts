import { useAssetDownloadProgress } from "@modules/core/assets/asset-downloader/shared/lib/hooks";
import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { useAssetImageProgress } from "@modules/core/assets/base/shared/lib/hooks";
import { useAppSelector } from "@shared/lib";

export const useAppLoaderProgress = () => {
	const { round } = Math;
	const externalImagesReady = useAppSelector(selectExternalImagesReady);
	const local = useAssetImageProgress();
	const external = useAssetDownloadProgress();

	if (external.progress === 0 && externalImagesReady) {
		return local.progress;
	}

	return round(0.2 * local.progress) + round(0.8 * external.progress);
};
