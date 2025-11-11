import {
	revealChaosTokens,
	selectCanRevealChaosTokens,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { ChaosTokenRevealHistory } from "@modules/chaos-bag/reveal/base/entities/ui";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useAppDispatch } from "@shared/lib";
import { omit } from "ramda";
import { useCallback, useMemo } from "react";
import * as C from "./Step3.components";
export const Step3 = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectRevealedTokens);
	const { canReveal } = useAppSelector(selectCanRevealChaosTokens(1));

	const tokens = useMemo(
		() => data.map((item) => omit(["value"], item)),
		[data],
	);

	const revealMore = useCallback(() => {
		dispatch(
			revealChaosTokens({
				boardId: "current",
				count: 1,
			}),
		);
	}, [dispatch]);

	return (
		<C.Container>
			<C.Content>
				<C.History>
					<ChaosTokenRevealHistory tokens={tokens} disableSelection />
				</C.History>
				{canReveal && (
					<C.OneMore onPress={revealMore}>
						<C.Plus icon="plus" />
					</C.OneMore>
				)}
			</C.Content>
		</C.Container>
	);
};
