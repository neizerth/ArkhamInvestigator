import {
	delay,
	goBack,
	selectBoardIds,
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
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
					<>
						<C.Board
							key={id}
							boardId={id}
							selected={currentIndex === index}
							onSelect={onSelect(index)}
						/>
						{index !== ids.length - 1 && (
							<C.Separator key={`separator-${id}`} />
						)}
					</>
				))}
			</C.Content>
		</C.Container>
	);
};
