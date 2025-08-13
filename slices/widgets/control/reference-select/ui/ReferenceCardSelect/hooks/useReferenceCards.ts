import { selectStory } from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";

export const useReferenceCards = () => {
	const story = useAppSelector(selectStory);
	const cards = story?.referenceCards || [];

	return useMemo(() => {
		return cards.map((card) => ({
			label: card.name,
			value: card,
		}));
	}, [cards]);
};
