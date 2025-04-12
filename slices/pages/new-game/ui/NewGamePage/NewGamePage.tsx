import { useAppTranslation } from "@features/i18n";
import { Loader } from "@shared/ui";
import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { Suspense } from "react";
import * as C from "./NewGamePage.components";

export const NewGamePage = () => {
	const { t } = useAppTranslation();
	return (
		<C.Page title={t`Choose an Investigator`} full>
			<Suspense fallback={<Loader />}>
				<InvestigatorSelect />
			</Suspense>
		</C.Page>
	);
};
