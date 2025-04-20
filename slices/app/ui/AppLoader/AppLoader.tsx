import type { AppLoadState } from "@app/model";
import { Loader, Progress } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./AppLoader.components";

export type AppLoaderProps = ViewProps & {
	state: AppLoadState;
};

export const AppLoader = ({ state, ...props }: AppLoaderProps) => {
	const { total, loadedCount, done } = state.assets;

	const progress = (loadedCount * 100) / total;

	return (
		<C.Container {...props}>
			<Loader />
			{!done && <Progress value={progress} />}
		</C.Container>
	);
};
