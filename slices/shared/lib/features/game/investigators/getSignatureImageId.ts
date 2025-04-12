import type { InvestigatorSignature } from "arkham-investigator-data";

export const getSignatureImageId = ({
	alternate_of_code,
	code,
}: InvestigatorSignature) => alternate_of_code || code;
