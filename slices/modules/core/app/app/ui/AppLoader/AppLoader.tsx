import { Loader, Progress } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./AppLoader.components";
import { useAppLoaderProgress } from "./useAppLoaderProgress";

export type AppLoaderProps = ViewProps;

export const AppLoader = (props: AppLoaderProps) => {
	const progress = useAppLoaderProgress();

	return (
		<C.Container {...props}>
			<Loader />
			<Progress value={progress} />
		</C.Container>
	);
};
