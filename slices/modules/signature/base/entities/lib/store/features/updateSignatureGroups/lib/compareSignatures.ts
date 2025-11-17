import type {
	InvestigatorSignatureGroup as Group,
	InvestigatorSignature,
} from "arkham-investigator-data";
import { indexBy, prop, uniq } from "ramda";

export const compareSignatures = (group1: Group[], group2: Group[]) => {
	const signatures1 = group1.flatMap(prop("signatures"));
	const signatures2 = group2.flatMap(prop("signatures"));

	const indexMap = indexBy<InvestigatorSignature>(prop("code"));
	const oldMap = indexMap(signatures1);
	const oldGroupMap = indexBy(prop("id"), group1);

	const changed = signatures2.filter(({ code, image }) => {
		const old = oldMap[code];

		if (!old) {
			return false;
		}

		return old.image.version !== image.version;
	});

	const newWithinExistingGroups = group2
		.filter(({ id }) => Boolean(oldGroupMap[id]))
		.flatMap(({ signatures }) =>
			signatures.filter(({ code }) => !oldMap[code]),
		);

	const added = group2
		.filter(({ id }) => {
			const oldGroup = oldGroupMap[id];

			return !oldGroup;
		})
		.flatMap(prop("signatures"));

	const data = [...changed, ...newWithinExistingGroups, ...added];
	const imageIds = uniq(data.map(({ image }) => image.id));

	return imageIds;
};
