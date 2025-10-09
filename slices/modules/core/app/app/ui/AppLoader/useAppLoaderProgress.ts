import { useAssetDownloadProgress } from "@modules/core/assets/asset-downloader/shared/lib/hooks";
import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { useAssetImageProgress } from "@modules/core/assets/base/shared/lib/hooks";
import { useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";

const getProgress = (local: number, external: number) => {
	return Math.round(0.2 * local + 0.8 * external);
};

export const useAppLoaderProgress = () => {
	const local = useAssetImageProgress();
	const external = useAssetDownloadProgress();

	const externalImagesReady = useAppSelector(selectExternalImagesReady);
	const [imagesReady, setImagesReady] = useState(externalImagesReady);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (external.progress >= 100 && !imagesReady) {
			setImagesReady(true);
			setProgress(getProgress(local.progress, external.progress));
		}
	}, [external.progress, imagesReady, local.progress]);

	if (!imagesReady) {
		return getProgress(local.progress, external.progress);
	}

	// Scale local progress from transitionProgress to 100
	const scaledProgress = progress + (100 - progress) * (local.progress / 100);

	return Math.round(scaledProgress);
};
