import { setReplaceInvestigator, useAppDispatch } from "@shared/lib";
import { Delay } from "@shared/ui";
import { InvestigatorSelect } from "@widgets/investigator";
import { useCallback } from "react";
import * as C from "./ReplaceInvestigatorPage.components";

export const ReplaceInvestigatorPage = () => {
	const dispatch = useAppDispatch();

	const onBack = useCallback(() => {
		dispatch(setReplaceInvestigator(false));
	}, [dispatch]);

	return (
		<C.Page title="Choose an Investigator" full onBack={onBack}>
			<Delay fallback={<C.Loader />}>
				<InvestigatorSelect />
			</Delay>
		</C.Page>
	);
};
