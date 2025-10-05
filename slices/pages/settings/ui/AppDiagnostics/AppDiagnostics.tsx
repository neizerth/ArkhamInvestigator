import { clearImageCache } from "@modules/core/app/entities/clearImageCache";
import { restartApp } from "@modules/core/app/entities/restartApp";
import { reloadAssets } from "@modules/core/app/features/reload-assets";
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
		dispatch(reloadAssets());
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
