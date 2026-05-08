import { checkAppUpdates } from "@modules/core/app/entities/checkAppUpdates";
import { clearImageCache } from "@modules/core/app/entities/clearImageCache";
import { restartApp } from "@modules/core/app/entities/restartApp";
import { externalImagesDiskPath } from "@modules/core/assets/base/shared/config";
import { reloadExternalAssets } from "@modules/core/assets/base/shared/lib";
import { clearDownloadQueue } from "@modules/core/assets/download-queue/shared/lib";
import { removeDirectory } from "@modules/core/disk/entities/removeDirectory";
import { clearLogs as clearLogsAction } from "@modules/core/log/entities/lib/store/features/clearLogs";
import { shareLogs as shareLogsAction } from "@modules/core/log/entities/lib/store/features/shareLogs";
import { usePage } from "@modules/core/router/shared/lib";
import { unsetArtworkUrl as unsetArtworkUrlAction } from "@modules/core/theme/shared/lib/store/theme";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useTranslation } from "react-i18next";
import * as C from "./DiagnosticsPage.components";

export const DiagnosticsPage = () => {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const goTo = usePage();

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

	const checkUpdates = () => {
		dispatch(
			checkAppUpdates({
				notify: true,
			}),
		);
	};

	const unsetArtworkUrl = () => {
		dispatch(unsetArtworkUrlAction());
	};

	const shareLogs = () => {
		dispatch(shareLogsAction());
	};

	const clearLogs = () => {
		dispatch(
			clearLogsAction({
				period: "all",
				notify: true,
			}),
		);
	};

	return (
		<C.Page title="Diagnostics">
			<C.Container>
				<C.Content>
					<C.Section title={t`App Data`}>
						<C.Row>
							<C.Button
								text={t`Check Data Updates`}
								icon="cloud-download"
								onPress={checkUpdates}
							/>
						</C.Row>
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
						<ArtworksFragment>
							<C.Row>
								<C.Button
									text={t`Reload downloaded assets`}
									icon="download"
									onPress={reloadData}
								/>
							</C.Row>
							<C.Row>
								<C.Button
									text={t`Remove artworks url`}
									icon="link"
									onPress={unsetArtworkUrl}
								/>
							</C.Row>
						</ArtworksFragment>

						<C.Row>
							<C.Button text={t`Restart App`} icon="switch" onPress={restart} />
						</C.Row>
					</C.Section>
					<C.Section title={t`Logs`}>
						<C.Row>
							<C.Button text={t`log.share`} icon="share" onPress={shareLogs} />
						</C.Row>
						<C.Row>
							<C.Button text={t`log.clear`} icon="trash" onPress={clearLogs} />
						</C.Row>
					</C.Section>
					<C.Section title={t`Performance`}>
						<C.Row>
							<C.Button
								text={t`chaosOdds.performance.title`}
								icon="meter"
								onPress={goTo(routes.chaosOddsPerformance)}
							/>
						</C.Row>
					</C.Section>
				</C.Content>
			</C.Container>
		</C.Page>
	);
};
