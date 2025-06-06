import { selectReferenceCard, stripTags, useAppSelector } from "@shared/lib";
import { useMemo } from "react";

export const useReferenceCardData = () => {
	const referenceCard = useAppSelector(selectReferenceCard);

	return useMemo(() => {
		if (!referenceCard) {
			return [];
		}

		return [
			{
				label: stripTags(referenceCard.difficulty),
				value: false,
			},
			{
				label: stripTags(referenceCard.back_difficulty),
				value: true,
			},
		];
	}, [referenceCard]);
};
