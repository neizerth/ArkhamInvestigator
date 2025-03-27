import { LayoutContext } from "@pages/board/config";
import { getPortraitLayout, useInvestigatorImageStyle } from "@pages/board/lib";
import {
	selectCurrentBoard,
	useAppSelector,
	useInvestigatorImageUrl,
} from "@shared/lib";
import { memo, useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./PortraitImage.components";

export type PortraitImageProps = ViewProps;

export const PortraitImage = ({ ...props }: PortraitImageProps) => {
	const { view, layout } = useContext(LayoutContext);

	const board = useAppSelector(selectCurrentBoard);

	if (!board) {
		return null;
	}

	const { picture } = board;

	const activeStyle = useInvestigatorImageStyle();

	const { id } = picture;

	const uri = useInvestigatorImageUrl({
		code: id,
		type: "full",
	});

	const source = { uri };

	const imageLayout = getPortraitLayout({
		layout,
		view,
		picture,
	});

	return (
		<C.Container {...props} layout={layout}>
			<C.Content style={activeStyle}>
				{imageLayout && <C.Background source={source} layout={imageLayout} />}
			</C.Content>
		</C.Container>
	);
};

export const PortraitImageMemo = memo(PortraitImage);
