import type { ReferenceCard } from "arkham-investigator-data";

type Options = {
	card?: ReferenceCard;
	showBack?: boolean;
};
export const getReferenceCardText = ({ card, showBack = false }: Options) => {
	if (!card) {
		return;
	}

	return showBack ? card.back_text : card.text;
};
