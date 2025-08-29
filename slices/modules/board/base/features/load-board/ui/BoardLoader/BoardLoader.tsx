import { BoardDescriptionLoadProvider } from "@modules/board/base/features/init-board-description";
import type { PropsWithChildren } from "react";
import * as C from "./BoardLoader.components";
import { useBoardLoadProgress } from "./useBoardLoadProgress";

export const BoardLoader = ({ children }: PropsWithChildren) => {
	const progress = useBoardLoadProgress();
	const loaded = progress === 100;

	return (
		<>
			{!loaded && <C.Loader progress={progress} />}
			{children}
			<BoardDescriptionLoadProvider />
		</>
	);
};
