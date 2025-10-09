import {
	selectBoardIds,
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { delay, useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { Fragment, useCallback, useState } from "react";
import { Dimensions } from "react-native";
import * as C from "./OverviewBoardPage.components";

const window = Dimensions.get("window");

const smallScreen = window.height <= 700;

export const OverviewBoardPage = () => {
	const dispatch = useAppDispatch();
	const ids = useAppSelector(selectBoardIds);
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex);
	const [offset, setOffset] = useState(0);

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

	const data =
		smallScreen && ids.length > 3 ? ids.slice(offset, offset + 3) : ids;

	return (
		<C.Container title="Investigators" onClose={back}>
			<Delay>
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
			</Delay>
		</C.Container>
	);
};
