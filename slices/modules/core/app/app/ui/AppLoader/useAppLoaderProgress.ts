import { useAssetDownloadProgress } from "@modules/core/assets/asset-downloader/shared/lib/hooks";
import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { useAssetImageProgress } from "@modules/core/assets/base/shared/lib/hooks";
import { useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";

export const useAppLoaderProgress = () => {
	const { round } = Math;

	const local = useAssetImageProgress();
	const external = useAssetDownloadProgress();

	const externalImagesReady = useAppSelector(selectExternalImagesReady);
	const [imagesReady, setImagesReady] = useState(externalImagesReady);

	useEffect(() => {
		if (externalImagesReady) {
			setImagesReady(true);
		}
	}, [externalImagesReady]);

	if (imagesReady) {
		return local.progress;
	}

	const externalProgress =
		external.progress === 0 && imagesReady ? 100 : external.progress;

	return round(0.2 * local.progress) + round(0.8 * externalProgress);
};
