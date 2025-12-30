import { setReplaceSignature } from "@modules/signature/signature-selection/shared/lib";
import { SignatureSelect } from "@modules/signature/signature-selection/widgets/signature-select";
import { useAppDispatch } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./ReplaceInvestigatorPage.components";

export const ReplaceInvestigatorPage = () => {
	const dispatch = useAppDispatch();

	const onBack = useCallback(() => {
		dispatch(setReplaceSignature(false));
	}, [dispatch]);

	return (
		<C.Page title="Choose an Investigator" full onBack={onBack}>
			<Delay fallback={<C.Loader />}>
				<SignatureSelect />
			</Delay>
		</C.Page>
	);
};
