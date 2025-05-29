import {
	delay,
	goBack,
	selectBoardIds,
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { Fragment, useCallback } from "react";
import * as C from "./OverviewBoardPage.components";

export const OverviewBoardPage = () => {
	const dispatch = useAppDispatch();
	const ids = useAppSelector(selectBoardIds);
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex);

	const onSelect = useCallback(
		(index: number) => () => {
			dispatch(goBack());
			delay(100).then(() => {
				dispatch(setCurrentInvestigatorIndex(index));
			});
		},
		[dispatch],
	);

	return (
		<C.Container title="Investigators">
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
