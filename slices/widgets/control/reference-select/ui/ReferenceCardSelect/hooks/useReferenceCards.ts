import type { Story } from "@modules/stories/shared/model";
import { useMemo } from "react";

export const useReferenceCards = (story?: Story | null) => {
	const cards = story?.referenceCards || [];

	return useMemo(() => {
		return cards.map((card) => ({
			label: card.name,
			value: card,
		}));
	}, [cards]);
};
