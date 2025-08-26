import { selectBoardId } from "@modules/board/base/shared/lib";
import { delay, useAppSelector } from "@shared/lib";
import { isNull } from "ramda-adjunct";
import { useCallback, useEffect, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackgroundProvider.components";

export type InvestigatorBackgroundProviderProps = ViewProps;
export const InvestigatorBackgroundProvider = (
	props: InvestigatorBackgroundProviderProps,
) => {
	const id = useAppSelector(selectBoardId("current"));

	const [currentId, setCurrentId] = useState(id);
	const [prevId, setPrevId] = useState<number | null>(null);

	const [showCurrent, setShowCurrent] = useState(true);
	const [showPrev, setShowPrev] = useState(false);

	useEffect(() => {
		if (currentId === id) {
			return;
		}
		setShowPrev(false);
		setPrevId(id);
	}, [id, currentId]);

	const onPrevLoad = useCallback(async () => {
		await delay(200);
		setShowPrev(true);
		setShowCurrent(false);
		setCurrentId(id);
	}, [id]);

	const onLoad = useCallback(async () => {
		await delay(200);
		setShowCurrent(true);
		setShowPrev(false);
		setPrevId(null);
	}, []);

	return (
		<C.Container {...props}>
			<C.Background
				boardId={currentId}
				hidden={!showCurrent}
				onDisplay={onLoad}
			/>
			{!isNull(prevId) && (
				<C.PrevBackground
					boardId={prevId}
					onDisplay={onPrevLoad}
					hidden={!showPrev}
				/>
			)}
		</C.Container>
	);
};
