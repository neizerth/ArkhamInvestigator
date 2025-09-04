import { BoardDescriptionLoadProvider } from "@modules/board/base/features/init-board-description";
import { type PropsWithChildren, memo } from "react";
import * as C from "./BoardLoader.components";
import { useBoardLoadProgress } from "./useBoardLoadProgress";
import { useLoaderText } from "./useLoaderText";

export const BoardLoader = ({ children }: PropsWithChildren) => {
	const { progress, total } = useBoardLoadProgress();
	const loaded = progress === 100;
	const showProgress = total > 1;
	const text = useLoaderText();

	const showLoader = !!total && !loaded;

	return (
		<>
			{showLoader && (
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

export const BoardLoaderMemo = memo(BoardLoader);
