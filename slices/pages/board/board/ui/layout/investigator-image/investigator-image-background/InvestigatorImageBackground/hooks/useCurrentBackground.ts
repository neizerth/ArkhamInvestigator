import { selectCurrentBoardProp, useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";
import { useImageOffsets } from "./useImageOffsets";

export const useCurrentBackground = () => {
	const { view } = useContext(LayoutContext);
	const image = useAppSelector(selectCurrentBoardProp("image"));
	const offsets = useImageOffsets();
	const offsetBottom = offsets[image.id] || 0;

	return useMemo(() => {
		if (!image) {
			return;
		}
		return {
			version: image.version,
			code: image.id,
			layout: getImageLayout({
				image,
				view,
				offsetBottom,
			}),
		};
	}, [image, view, offsetBottom]);
};
