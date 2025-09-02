import { BoardDescriptionLoadProvider } from "@modules/board/base/features/init-board-description";
import type { PropsWithChildren } from "react";
import { Platform } from "react-native";
import * as C from "./BoardLoader.components";
import { useBoardLoadProgress } from "./useBoardLoadProgress";
import { useLoaderText } from "./useLoaderText";

const optimisticInterval = Platform.OS === "ios" ? 500 : 50;

export const BoardLoader = ({ children }: PropsWithChildren) => {
	const { progress, total } = useBoardLoadProgress();
	const loaded = progress === 100;
	const showProgress = total > 1;
	const text = useLoaderText();

	return (
		<>
			{!loaded && (
				<C.Loader
					progress={progress}
					showProgress={showProgress}
					showNumericProgress
				>
					<C.LoadingText>{text}</C.LoadingText>
				</C.Loader>
			)}
			{children}
			<BoardDescriptionLoadProvider />
		</>
	);
};
