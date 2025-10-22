import type { InvestigatorSignature } from "arkham-investigator-data";

export const getOptionName = (signature: InvestigatorSignature) => {
	if (signature.taboo && signature.taboo_set) {
		return "Taboo Set";
	}
	return signature.pack.name;
};
