import { clearChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { usePage } from "@modules/core/router/shared/lib";
import { selectReferenceCard, selectStory } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import { truncate, useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPage = () => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
	const referenceCard = useAppSelector(selectReferenceCard);
	const count = useAppSelector(selectChaosTokenCount);
	const { t } = useTranslation();

	const goToPage = usePage();

	const label = referenceCard?.name ?? t`Scenario reference`;

	const difficultyLevels = story?.difficultyLevels || [];

	const canFillChaosBag = difficultyLevels.length > 0;

	const clearLabel = canFillChaosBag ? "" : t`Clear`;

	const clear = useCallback(() => {
		dispatch(clearChaosBag());
	}, [dispatch]);

	return (
		<C.Container title="Chaos bag" full>
			<Delay>
				<C.Reference>
					<C.ReferenceButton
						text={truncate(label, 22)}
						icon="list2"
						onPress={goToPage(routes.chaosBagReferenceEdit)}
					/>

					<C.Actions>
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
					</C.Actions>
				</C.Reference>
				<C.Bag />
			</Delay>
		</C.Container>
	);
};
1;
