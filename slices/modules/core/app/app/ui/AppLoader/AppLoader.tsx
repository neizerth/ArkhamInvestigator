import { selectAppReady } from "@modules/core/app/shared/lib";
import {
	retryExternalImagesDownload,
	selectExternalImagesError,
	selectExternalImagesReady,
} from "@modules/core/assets/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { Button, LoadScreenMemo as LoadScreen } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./AppLoader.components";
import { useAppLoaderProgress } from "./useAppLoaderProgress";
import { useHideSplashScreen } from "./useHideSplashScreen";

export const AppLoader = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const progress = useAppLoaderProgress();
	const { hideSplash, splashHidden } = useHideSplashScreen();

	// no text until fonts and language are ready: it would flash in a fallback font / language
	const ready = useAppSelector(selectAppReady);
	const externalImagesReady = useAppSelector(selectExternalImagesReady);
	const externalImagesError = useAppSelector(selectExternalImagesError);

	const retry = useCallback(() => {
		dispatch(retryExternalImagesDownload());
	}, [dispatch]);

	return (
		<LoadScreen
			progress={progress}
			showProgress={splashHidden}
			showNumericProgress={ready && !externalImagesReady}
			onLogoLoad={hideSplash}
		>
			{ready && externalImagesError && (
				<C.ErrorContainer>
					<C.ErrorText>{t("app.loader.downloadFailed")}</C.ErrorText>
					<Button text={t("app.loader.retry")} onPress={retry} />
				</C.ErrorContainer>
			)}
		</LoadScreen>
	);
};
