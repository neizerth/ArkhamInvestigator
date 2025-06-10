import { createChaosBag } from "@features/game/chaos-bag";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { routes } from "@shared/config";
import {
	selectReferenceCard,
	selectStory,
	useAppDispatch,
	useAppSelector,
	usePage,
} from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPage = () => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
	const referenceCard = useAppSelector(selectReferenceCard);
	const { t } = useAppTranslation();

	const createBag = useCallback(() => {
		dispatch(createChaosBag());
	}, [dispatch]);

	const goToPage = usePage();

	const label = referenceCard?.name || t`Scenario reference`;

	return (
		<C.Container title="Chaos bag" onBack={createBag} full>
			<Delay>
				<C.Reference>
					<C.ReferenceButton
						text={label}
						icon="list2"
						onPress={goToPage(routes.chaosBagReferenceEdit)}
					/>
					{story && (
						<C.SetupButton
							text={t`Fill`}
							icon="chaos-bag-thin"
							onPress={goToPage(routes.chaosBagFill)}
						/>
					)}
				</C.Reference>
				<C.Bag />
			</Delay>
		</C.Container>
	);
};
1;
