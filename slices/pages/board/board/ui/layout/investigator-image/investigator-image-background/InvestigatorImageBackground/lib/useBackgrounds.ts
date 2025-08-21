import { selectInvestigatorBoardImages } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { Dimensions } from "react-native";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";
import { useImageOffsets } from "./useImageOffsets";

const view = Dimensions.get("screen");

export const useBackgrounds = () => {
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
	}, [images, offsets]);
};
