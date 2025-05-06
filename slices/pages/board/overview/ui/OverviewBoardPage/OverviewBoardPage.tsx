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
import type { ListRenderItemInfo } from "react-native";
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

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<number>) => {
			return (
				<C.Board
					key={item}
					boardId={item}
					separator={index > 0}
					selected={currentIndex === index}
					onSelect={onSelect(index)}
				/>
			);
		},
		[currentIndex, onSelect],
	);

	return (
		<C.Container title="Investigators">
			<C.Content>
				<C.List renderItem={renderItem} data={ids} />
			</C.Content>
		</C.Container>
	);
};
