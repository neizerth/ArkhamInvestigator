import { createChaosBag } from "@features/chaos-bag";
import { useAppTranslation } from "@features/i18n";
import { routes } from "@shared/config";
import {
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
	const { t } = useAppTranslation();

	const createBag = useCallback(() => {
		dispatch(createChaosBag());
	}, [dispatch]);

	const goToPage = usePage();

	const label = story?.name || t`Scenario reference`;

	return (
		<C.Container title="Chaos bag" onBack={createBag} full>
			<Delay>
				<C.Reference>
					<C.ReferenceButton
						text={label}
						icon="list2"
						onPress={goToPage(routes.chaosBagReference)}
					/>
				</C.Reference>
				<C.Bag />
			</Delay>
		</C.Container>
	);
};
1;
