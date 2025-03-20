import { LayoutContext } from "@pages/board/config";
import { getLandscapeLayout } from "@pages/board/lib/image/background/getLandscapeLayout";
import type { HeaderLayout } from "@pages/board/model";
import { getInvestigatorImageUrl } from "@shared/api";
import type { miniImageSize } from "@shared/config";
import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import type { Box } from "@shared/model";
import { useContext } from "react";
import type { ImageProps } from "react-native";
import * as C from "./LandscapeImage.components";

export type LandscapeImageProps = ImageProps;

export const LandscapeImage = ({ ...props }: LandscapeImageProps) => {
	const { view, layout } = useContext(LayoutContext);
	const { picture } = useAppSelector(selectCurrentBoard);
	const { id } = picture;
	const uri = getInvestigatorImageUrl({
		code: id,
		type: "mini",
	});
	const source = { uri };

	const imageLayout = getLandscapeLayout({
		view,
		layout,
	});

	return <C.Background {...props} {...imageLayout} source={source} />;
};
