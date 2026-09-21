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

export const AppLoader = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const progress = useAppLoaderProgress();

	const externalImagesReady = useAppSelector(selectExternalImagesReady);
	const externalImagesError = useAppSelector(selectExternalImagesError);

	const retry = useCallback(() => {
		dispatch(retryExternalImagesDownload());
	}, [dispatch]);

	return (
		<LoadScreen progress={progress} showNumericProgress={!externalImagesReady}>
			{externalImagesError && (
				<C.ErrorContainer>
					<C.ErrorText>{t("app.loader.downloadFailed")}</C.ErrorText>
					<Button text={t("app.loader.retry")} onPress={retry} />
				</C.ErrorContainer>
			)}
		</LoadScreen>
	);
};
