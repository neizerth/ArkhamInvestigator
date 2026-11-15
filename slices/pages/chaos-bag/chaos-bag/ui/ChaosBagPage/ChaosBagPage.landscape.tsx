import { clearChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { useGoBack, usePage } from "@modules/core/router/shared/lib";
import { selectReferenceCard, selectStory } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import { truncate, useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay, SafeContent } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChaosBagPageActions as Actions } from "../ChaosBagPageActions";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPageLandscape = () => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
	const referenceCard = useAppSelector(selectReferenceCard);
	const _count = useAppSelector(selectChaosTokenCount);
	const goBack = useGoBack();
	const { t } = useTranslation();

	const goToPage = usePage();

	const label = referenceCard?.name ?? t`Scenario reference`;

	const difficultyLevels = story?.difficultyLevels || [];

	const canFillChaosBag = difficultyLevels.length > 0;

	const _clearLabel = canFillChaosBag ? "" : t`Clear`;

	const _clear = useCallback(() => {
		dispatch(clearChaosBag());
	}, [dispatch]);

	return (
		<C.LandscapeContainer>
			<C.LandscapeBar title={t`Chaos bag`} onBack={goBack}>
				<Actions />

				<C.ReferenceButton
					text={truncate(label, 22)}
					icon="list2"
					onPress={goToPage(routes.chaosBagReferenceEdit)}
				/>
			</C.LandscapeBar>
			<SafeContent>
				<Delay />
			</SafeContent>
		</C.LandscapeContainer>
	);
};
