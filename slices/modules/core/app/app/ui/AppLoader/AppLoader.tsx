import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { LoadScreenMemo as LoadScreen } from "@shared/ui";
import { useAppLoaderProgress } from "./useAppLoaderProgress";

export const AppLoader = () => {
	const progress = useAppLoaderProgress();

	const externalImagesReady = useAppSelector(selectExternalImagesReady);

	return (
		<LoadScreen
			progress={progress}
			showNumericProgress={!externalImagesReady}
		/>
	);
};
