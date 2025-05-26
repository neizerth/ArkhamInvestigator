import { selectBoardImages, useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";
import { useImageOffsets } from "./useImageOffsets";

export const useBackgrounds = () => {
	const { view } = useContext(LayoutContext);
	const images = useAppSelector(selectBoardImages);
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
