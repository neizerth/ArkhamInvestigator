import type {
	InvestigatorSignatureGroup as Group,
	InvestigatorSignature,
} from "arkham-investigator-data";
import { indexBy, prop } from "ramda";

export const compareSignatures = (group1: Group[], group2: Group[]) => {
	const signatures1 = group1.flatMap(prop("signatures"));
	const signatures2 = group2.flatMap(prop("signatures"));

	const indexMap = indexBy<InvestigatorSignature>(prop("code"));
	const oldMap = indexMap(signatures1);

	const changed = signatures2.filter(({ code, image }) => {
		const old = oldMap[code];

		if (!old) {
			return false;
		}

		return old.image.version !== image.version;
	});

	const oldGroupMap = indexBy(prop("id"), group1);

	const added = group2
		.filter(({ id }) => {
			const oldGroup = oldGroupMap[id];

			return !oldGroup;
		})
		.flatMap(prop("signatures"));

	const data = [...changed, ...added];
	return data.map(({ image }) => image.id);
};
