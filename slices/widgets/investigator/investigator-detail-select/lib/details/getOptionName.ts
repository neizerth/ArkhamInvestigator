import type { InvestigatorSignature } from "arkham-investigator-data";

export const getOptionName = (signature: InvestigatorSignature) => {
	if (signature.taboo && signature.taboo_set) {
		return "Taboo Set";
	}
	const isCore = signature.pack.code === "core";
	if (!signature.official || isCore) {
		return signature.pack.name;
	}
	return signature.cycle.name;
};
