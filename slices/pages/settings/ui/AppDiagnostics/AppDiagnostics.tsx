import { clearImageCache } from "@modules/core/app/entities/clearImageCache";
import { restartApp } from "@modules/core/app/entities/restartApp";
import { externalImagesDiskPath } from "@modules/core/assets/base/shared/config";
import { reloadExternalAssets } from "@modules/core/assets/base/shared/lib";
import { clearDownloadQueue } from "@modules/core/assets/download-queue/shared/lib";
import { removeDirectory } from "@modules/core/disk/entities/removeDirectory";
import { useAppDispatch } from "@shared/lib";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./AppDiagnostics.components";

export type AppDiagnosticsProps = ViewProps;

export const AppDiagnostics = (props: AppDiagnosticsProps) => {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const clearCache = () => {
		dispatch(clearImageCache());
	};
	const restart = () => {
		dispatch(restartApp());
	};

	const reloadData = () => {
		dispatch(removeDirectory({ directory: externalImagesDiskPath }));
		dispatch(reloadExternalAssets());
		restart();
	};

	const clearDownloads = () => {
		dispatch(clearDownloadQueue());
		restart();
	};

	return (
		<C.Container {...props}>
			<C.Section title={t`Diagnostics`}>
				<C.Row>
					<C.Button
						text={t`Clear image cache`}
						icon="image"
						onPress={clearCache}
					/>
				</C.Row>
				<C.Row>
					<C.Button
						text={t`Clear download queue`}
						icon="drawer2"
						onPress={clearDownloads}
					/>
				</C.Row>
				<C.Row>
					<C.Button
						text={t`Reload downloaded assets`}
						icon="download"
						onPress={reloadData}
					/>
				</C.Row>
				<C.Row>
					<C.Button text={t`Restart App`} icon="switch" onPress={restart} />
				</C.Row>
			</C.Section>
		</C.Container>
	);
};
