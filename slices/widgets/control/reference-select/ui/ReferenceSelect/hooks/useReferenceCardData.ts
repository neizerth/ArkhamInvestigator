import { getReferenceCardTitle } from "@entities/reference-card";
import { selectReferenceCard, useAppSelector } from "@shared/lib";
import { useMemo } from "react";

export const useReferenceCardData = () => {
	const referenceCard = useAppSelector(selectReferenceCard);

	return useMemo(() => {
		if (!referenceCard) {
			return [];
		}

		return [
			{
				label: getReferenceCardTitle(referenceCard.text),
				value: false,
			},
			{
				label: getReferenceCardTitle(referenceCard.back_text),
				value: true,
			},
		];
	}, [referenceCard]);
};
