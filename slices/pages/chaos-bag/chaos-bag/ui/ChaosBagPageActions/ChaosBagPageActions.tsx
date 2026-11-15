import { clearChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { usePage } from "@modules/core/router/shared/lib";
import { selectStory } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./ChaosBagPageActions.components";

export const ChaosBagPageActions = () => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
	const count = useAppSelector(selectChaosTokenCount);
	const { t } = useTranslation();
	const goToPage = usePage();

	const difficultyLevels = story?.difficultyLevels || [];
	const canFillChaosBag = difficultyLevels.length > 0;
	const clearLabel = canFillChaosBag ? "" : t`Clear`;

	const clear = useCallback(() => {
		dispatch(clearChaosBag());
	}, [dispatch]);

	return (
		<C.Container>
			{count > 0 && (
				<C.ClearButton text={clearLabel} icon="trash" onPress={clear} />
			)}

			{canFillChaosBag && (
				<C.SetupButton
					text={t`Fill`}
					icon="chaos-bag-thin"
					onPress={goToPage(routes.chaosBagFill)}
				/>
			)}
		</C.Container>
	);
};
