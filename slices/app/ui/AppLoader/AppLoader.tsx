import type { AppLoadState } from "@app/model";
import { Loader } from "@shared/ui";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./AppLoader.components";

export type AppLoaderProps = ViewProps & {
	state: AppLoadState;
};

export const AppLoader = ({ state, ...props }: AppLoaderProps) => {
	const { t } = useTranslation();

	const { total, loadedCount } = state.assets;

	const loadingAssetsText = t("Loading assets {{count}}/{{total}}", {
		count: loadedCount,
		total,
	});

	const loadingFontsText = t`Loading fonts`;

	const title = state.fontsLoaded ? loadingAssetsText : loadingFontsText;

	return (
		<C.Container {...props}>
			<Loader />
			<C.Title>{title}</C.Title>
		</C.Container>
	);
};
