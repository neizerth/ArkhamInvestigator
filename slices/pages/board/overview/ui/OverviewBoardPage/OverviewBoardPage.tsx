import {
	selectBoardIds,
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { delay, useAppDispatch, useAppSelector } from "@shared/lib";
import { Fragment, useCallback } from "react";
import * as C from "./OverviewBoardPage.components";

export const OverviewBoardPage = () => {
	const dispatch = useAppDispatch();
	const ids = useAppSelector(selectBoardIds);
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex);

	const back = useGoBack();

	const onSelect = useCallback(
		(index: number) => () => {
			back();
			delay(100).then(() => {
				dispatch(setCurrentInvestigatorIndex(index));
			});
		},
		[dispatch, back],
	);

	return (
		<C.Container title="Investigators" onClose={back}>
			<C.Content>
				{ids.map((id, index) => (
					<Fragment key={id}>
						<C.Board
							boardId={id}
							selected={currentIndex === index}
							onSelect={onSelect(index)}
						/>
						{index !== ids.length - 1 && <C.Separator />}
					</Fragment>
				))}
			</C.Content>
		</C.Container>
	);
};
