import { selectCurrentBoardProp, useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../../../../../config";
import { useDescriptionHeight } from "../../../../../../lib";

export const useImageOffsets = () => {
	const { id } = useAppSelector(selectCurrentBoardProp("image"));

	const [offsets, setOffsets] = useState<Record<string, number | undefined>>(
		{},
	);
	const descriptionHeight = useDescriptionHeight();
	const offsetBottom = descriptionHeight - DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;

	useEffect(() => {
		if (!id) {
			return;
		}
		if (offsets[id] === offsetBottom) {
			return;
		}
		setOffsets({
			...offsets,
			[id]: offsetBottom,
		});
	}, [id, offsetBottom, offsets]);

	return offsets;
};
