import { selectCurrentBoardProp, useAppSelector } from "@shared/lib";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../../../../../../config";
import { getImageLayout } from "../../../../../../lib";

export const useBackground = () => {
	const { view } = useContext(LayoutContext);
	const image = useAppSelector(selectCurrentBoardProp("image"));

	return useMemo(() => {
		return {
			code: image.id,
			layout: getImageLayout({
				image,
				view,
			}),
		};
	}, [image, view]);
};
