import { usePage } from "@modules/core/router/shared/lib";
import { selectReferenceCard } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import { truncate, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { ChaosBagPageActions as Actions } from "../ChaosBagPageActions";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPagePortrait = () => {
	const referenceCard = useAppSelector(selectReferenceCard);
	const { t } = useTranslation();

	const goToPage = usePage();

	const label = referenceCard?.name ?? t`Scenario reference`;

	return (
		<C.Container title="Chaos bag" full>
			<Delay>
				<C.Reference>
					<C.ReferenceButton
						text={truncate(label, 22)}
						icon="list2"
						onPress={goToPage(routes.chaosBagReferenceEdit)}
					/>

					<Actions />
				</C.Reference>
				<C.Bag />
			</Delay>
		</C.Container>
	);
};
