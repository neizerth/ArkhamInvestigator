import { useAppTranslation } from "@features/i18n";
import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import * as C from "./NewGamePage.components";

export const NewGamePage = () => {
	const { t } = useAppTranslation();
	return (
		<C.Page title={t`Choose an Investigator`} full>
			<InvestigatorSelect />
		</C.Page>
	);
};
