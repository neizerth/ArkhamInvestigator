import { selectInvestigatorBoardImages } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";
import { useImageOffsets } from "./useImageOffsets";

export const useBackgrounds = () => {
	const { view } = useContext(LayoutContext);
	const images = useAppSelector(selectInvestigatorBoardImages);
	const offsets = useImageOffsets();

	return useMemo(() => {
		return images.map((image) => ({
			version: image.version,
			code: image.id,
			layout: getImageLayout({
				image,
				view,
				offsetBottom: offsets[image.id] || 0,
			}),
		}));
	}, [images, view, offsets]);
};
