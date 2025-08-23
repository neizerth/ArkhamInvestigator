import { selectInvestigatorBoardImages } from "@modules/board/base/shared/lib";
import { getSignatureImageLayout } from "@modules/signature/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { Dimensions } from "react-native";
import { useImageOffsets } from "./useImageOffsets";

const view = Dimensions.get("screen");

export const useBackgrounds = () => {
	const images = useAppSelector(selectInvestigatorBoardImages);
	const offsets = useImageOffsets();

	return useMemo(() => {
		return images.map((image) => ({
			version: image.version,
			code: image.id,
			layout: getSignatureImageLayout({
				image,
				view,
				offsetBottom: offsets[image.id] || 0,
			}),
		}));
	}, [images, offsets]);
};
