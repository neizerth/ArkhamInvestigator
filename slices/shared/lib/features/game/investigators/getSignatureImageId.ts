import type { InvestigatorSignature } from "arkham-investigator-data";

export const getSignatureImageId = ({
	alternate_of_code,
	linked_code,
	code,
	type,
}: InvestigatorSignature) => {
	if (type === "custom") {
		return linked_code || code;
	}
	return alternate_of_code || code;
};
