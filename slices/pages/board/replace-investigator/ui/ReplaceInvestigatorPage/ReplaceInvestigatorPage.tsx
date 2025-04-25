import { Delay } from "@shared/ui";
import { InvestigatorSelect } from "@widgets/investigator";
import * as C from "./ReplaceInvestigatorPage.components";

export const ReplaceInvestigatorPage = () => {
	return (
		<C.Page title="Choose an Investigator" full>
			<Delay fallback={<C.Loader />}>
				<InvestigatorSelect />
			</Delay>
		</C.Page>
	);
};
