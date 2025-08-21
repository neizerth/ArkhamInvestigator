import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { Dimensions } from "react-native";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";
import { useImageOffsets } from "./useImageOffsets";

const view = Dimensions.get("screen");

export const useCurrentBackground = () => {
	const image = useAppSelector(selectCurrentBoardProp("image"));
	const offsets = useImageOffsets();
	const offsetBottom = offsets[image.id] ?? 0;

	return useMemo(() => {
		return {
			version: image.version,
			code: image.id,
			layout: getImageLayout({
				image,
				view,
				offsetBottom,
			}),
		};
	}, [image, offsetBottom]);
};
