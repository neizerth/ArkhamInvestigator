import { selectBoardImages, useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";

export const useBackgrounds = () => {
	const { view } = useContext(LayoutContext);
	const images = useAppSelector(selectBoardImages);

	return useMemo(() => {
		return images.map((image) => ({
			code: image.id,
			layout: getImageLayout({
				image,
				view,
			}),
		}));
	}, [images, view]);
};
