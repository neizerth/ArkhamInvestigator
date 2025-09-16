import { selectReferenceCard } from "@modules/stories/shared/lib";
import { capitalize, stripTags, useAppSelector } from "@shared/lib";
import { useMemo } from "react";

const formatLabel = (label: string) => {
	return capitalize(stripTags(label));
};

export const useReferenceCardData = () => {
	const referenceCard = useAppSelector(selectReferenceCard);

	return useMemo(() => {
		if (!referenceCard) {
			return [];
		}

		return [
			{
				label: formatLabel(referenceCard.difficulty),
				value: false,
			},
			{
				label: formatLabel(referenceCard.back_difficulty),
				value: true,
			},
		];
	}, [referenceCard]);
};
