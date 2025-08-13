import {
	selectAssetImagesCount,
	selectAssetImagesLoadedCount,
} from "@modules/core/assets/shared/lib";
import { useAppSelector } from "@shared/lib";
import { Loader, Progress } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./AppLoader.components";

export type AppLoaderProps = ViewProps;

export const AppLoader = (props: AppLoaderProps) => {
	const total = useAppSelector(selectAssetImagesCount);
	const loaded = useAppSelector(selectAssetImagesLoadedCount);

	const progress = Math.round((loaded * 100) / total);

	return (
		<C.Container {...props}>
			<Loader />
			<Progress value={progress} />
		</C.Container>
	);
};
