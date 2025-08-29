import { LoadScreenMemo as LoadScreen } from "@shared/ui";
import type { ViewProps } from "react-native";
import { useAppLoaderProgress } from "./useAppLoaderProgress";

export type AppLoaderProps = ViewProps;

export const AppLoader = (props: AppLoaderProps) => {
	const progress = useAppLoaderProgress();

	return <LoadScreen progress={progress} />;
};
