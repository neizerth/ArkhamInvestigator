import { getReferencePartTokens } from "@modules/chaos-bag/base/shared/lib";
import type { ReferencePart } from "arkham-investigator-data";
import { isNotNil } from "ramda";

export const mergeReferenceTokenEffects = (
	base: ReferencePart[],
	parts: ReferencePart[],
): ReferencePart[] => {
	const newItems = parts.filter((newItem) => {
		const newTokens = getReferencePartTokens(newItem);

		return !base.some((baseItem) => {
			const baseTokens = getReferencePartTokens(baseItem);

			return baseTokens.some((token) => newTokens.includes(token));
		});
	});

	const mergedItems = base
		.map((baseItem) => {
			const baseTokens = getReferencePartTokens(baseItem);

			const newItem = parts.find((newItem) => {
				const newTokens = getReferencePartTokens(newItem);

				return baseTokens.some((token) => newTokens.includes(token));
			});

			if (!newItem) {
				return baseItem;
			}
			return {
				...baseItem,
				effect: `${baseItem.effect}\n${newItem.effect}`,
			};
		})
		.filter(isNotNil);

	return [...mergedItems, ...newItems];
};
