import { selectChaosBagEnabled } from "@features/chaos-bag";
import { useAppTranslation } from "@features/i18n";
import { routes } from "@shared/config";
import { goBack, useAppDispatch, useAppSelector, usePage } from "@shared/lib";
import { Delay } from "@shared/ui";
import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { TopBar } from "@widgets/top-bar";
import { useCallback } from "react";
import * as C from "./NewGamePage.components";

export const NewGamePage = () => {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const chaosBagEnabled = useAppSelector(selectChaosBagEnabled);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const goToPage = usePage();

	return (
		<C.Page>
			<TopBar title={t`Choose an Investigator`} onBack={back}>
				{chaosBagEnabled && (
					<C.BagButton
						icon="chaos-bag-thin"
						onPress={goToPage(routes.chaosBag)}
					/>
				)}
			</TopBar>
			<Delay fallback={<C.Loader />}>
				<InvestigatorSelect />
			</Delay>
		</C.Page>
	);
};
