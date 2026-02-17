import { useGoBack } from "@modules/core/router/shared/lib";
import { fillChaosBagDifficulty } from "@modules/stories/entities/lib";
import {
	selectStory,
	selectStoryDifficulty,
} from "@modules/stories/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./ChaosBagFillPage.components";

export const ChaosBagFillPage = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const story = useAppSelector(selectStory);
	const level = useAppSelector(selectStoryDifficulty);

	const difficultyId = level?.id;

	const back = useGoBack();

	const fill = useCallback(() => {
		if (!difficultyId) {
			return;
		}
		dispatch(fillChaosBagDifficulty({ difficultyId }));
		back();
	}, [dispatch, difficultyId, back]);

	// const tokens = useMemo(() => {
	// 	if (!value) {
	// 		return [];
	// 	}
	// 	return value.tokens.map((type) => ({
	// 		id: v4(),
	// 		type,
	// 	}));
	// }, [value]);

	// const fill = useCallback(() => {
	// 	const data = tokens.reduce(
	// 		(total, item) => {
	// 			const value = total[item.type] || 0;

	// 			total[item.type] = value + 1;

	// 			return total;
	// 		},
	// 		{} as Partial<Record<ChaosTokenType, number>>,
	// 	);

	// 	dispatch(
	// 		createChaosBag({
	// 			tokenCount: data,
	// 		}),
	// 	);
	// 	back();
	// }, [dispatch, back, tokens]);

	const title = story ? story.name : "Fill Chaos Bag";

	return (
		<C.Container title={title} onClose={back}>
			<C.Content>
				<C.Select story={story} />
				<C.Preview />
				<C.Actions>
					<C.Cancel text={t`Cancel`} icon="dismiss" onPress={back} />
					{level && <C.Ok text={t`Fill`} icon="check" onPress={fill} />}
				</C.Actions>
			</C.Content>
		</C.Container>
	);
};
