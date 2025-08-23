import { selectDescriptionHeight } from "@modules/board/base/entities/description/lib";
import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../../../../../config";

export const useImageOffsets = () => {
	const image = useAppSelector(selectCurrentBoardProp("image"));
	const id = image?.id;

	const [offsets, setOffsets] = useState<Record<string, number | undefined>>(
		{},
	);
	const descriptionHeight = useAppSelector(selectDescriptionHeight("current"));
	const offsetBottom = descriptionHeight - DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;

	useEffect(() => {
		if (!id) {
			return;
		}
		if (offsets[id]) {
			return;
		}
		setOffsets({
			...offsets,
			[id]: offsetBottom,
		});
	}, [id, offsetBottom, offsets]);

	return offsets;
};
