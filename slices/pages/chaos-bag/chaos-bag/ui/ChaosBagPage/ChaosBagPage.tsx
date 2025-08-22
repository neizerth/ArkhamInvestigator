import { usePage } from "@modules/core/router/shared/lib";
import { selectReferenceCard, selectStory } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useTranslation } from "react-i18next";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPage = () => {
	const story = useAppSelector(selectStory);
	const referenceCard = useAppSelector(selectReferenceCard);
	const { t } = useTranslation();

	const goToPage = usePage();

	const label = referenceCard?.name || t`Scenario reference`;

	return (
		<C.Container title="Chaos bag" full>
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
