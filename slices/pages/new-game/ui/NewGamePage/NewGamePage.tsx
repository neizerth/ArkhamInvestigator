import { selectChaosBagEnabled } from "@modules/chaos-bag/base/entities/lib";
import { useGoBack, usePage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { TopBar } from "@widgets/navigation";
import { useTranslation } from "react-i18next";
import * as C from "./NewGamePage.components";

export const NewGamePage = () => {
	const { t } = useTranslation();
	const chaosBagEnabled = useAppSelector(selectChaosBagEnabled);

	const back = useGoBack();

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
