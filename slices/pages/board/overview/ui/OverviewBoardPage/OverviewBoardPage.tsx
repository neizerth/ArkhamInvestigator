import {
	selectBoardIds,
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { dec, inc } from "ramda";
import { Fragment, useCallback, useState } from "react";
import { Dimensions } from "react-native";
import * as C from "./OverviewBoardPage.components";

const window = Dimensions.get("window");

const smallScreen = window.height <= 700;

const maxSize = smallScreen ? 3 : 4;

export const OverviewBoardPage = () => {
	const dispatch = useAppDispatch();
	const ids = useAppSelector(selectBoardIds);
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex);
	const [offset, setOffset] = useState(0);

	const back = useGoBack();

	const onSelect = useCallback(
		(index: number) => () => {
			dispatch(setCurrentInvestigatorIndex(index));
			back();
		},
		[dispatch, back],
	);

	const size = ids.length;
	const isStart = offset === 0;
	const isEnd = offset === size - maxSize;

	const next = useCallback(() => {
		if (isEnd) {
			return false;
		}
		setOffset(inc);
	}, [isEnd]);

	const prev = useCallback(() => {
		if (isStart) {
			return false;
		}
		setOffset(dec);
	}, [isStart]);

	const data = size > maxSize ? ids.slice(offset, offset + maxSize) : ids;

	return (
		<C.Container title="Investigators" onClose={back}>
			<C.Content>
				<Delay fallback={<C.Loader />} delayMs={0} key={offset}>
					{data.map((id, index) => (
						<Fragment key={id}>
							<C.Board
								boardId={id}
								selected={currentIndex === index}
								onSelect={onSelect(index)}
							/>
							{index !== data.length - 1 && <C.Separator />}
						</Fragment>
					))}
				</Delay>
				{size > maxSize && (
					<C.Actions>
						<C.Button disabled={isStart} direction="left" onPress={prev} />
						<C.Button disabled={isEnd} direction="right" onPress={next} />
					</C.Actions>
				)}
			</C.Content>
		</C.Container>
	);
};
