import type {
	InvestigatorSignatureGroup as Group,
	InvestigatorSignature,
} from "arkham-investigator-data";
import { indexBy, prop, uniq } from "ramda";

const indexByCode = indexBy<InvestigatorSignature>(prop("code"));

export const compareSignatureGroups = (
	group1: Group[],
	group2: Group[],
): string[] => {
	const signatures1 = group1.flatMap(prop("signatures"));
	const signatures2 = group2.flatMap(prop("signatures"));

	const oldMap = indexByCode(signatures1);

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
	const imageIds = data.map(({ image }) => image.id);

	return uniq(imageIds);
};
