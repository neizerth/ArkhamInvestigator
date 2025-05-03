import { selectCurrentBoardProp, useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib/image/background/getImageLayout";

export const useCurrentBackground = () => {
	const { view } = useContext(LayoutContext);
	const image = useAppSelector(selectCurrentBoardProp("image"));

	return useMemo(() => {
		if (!image) {
			return;
		}
		return {
			code: image.id,
			layout: getImageLayout({
				image,
				view,
			}),
		};
	}, [image, view]);
};
