import {
	selectCurrentBoardProp,
	useAppSelector,
	useInvestigatorImageUrl,
} from "@shared/lib";
import { memo, useContext } from "react";
import type { ViewProps } from "react-native";
import { LayoutContext } from "../../../../config";
import { getPortraitLayout } from "../../../../lib";
import * as C from "./InvestigatorImageBackground.components";
import { useInvestigatorImageStyle } from "./useInvestigatorImageStyle";

export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const { view, layout } = useContext(LayoutContext);

	const picture = useAppSelector(selectCurrentBoardProp("picture"));

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

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
