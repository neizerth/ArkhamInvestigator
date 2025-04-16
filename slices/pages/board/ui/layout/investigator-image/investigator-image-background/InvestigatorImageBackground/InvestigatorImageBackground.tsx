import {
	selectCurrentBoardProp,
	useAppSelector,
	useInvestigatorImageUrl,
} from "@shared/lib";
import { memo, useContext } from "react";
import { Platform, type ViewProps } from "react-native";
import { v4 } from "uuid";
import { LayoutContext } from "../../../../../config";
import { getPortraitLayout } from "../../../../../lib";
import * as C from "./InvestigatorImageBackground.components";
const permanentKey = v4();

export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const { view } = useContext(LayoutContext);

	const image = useAppSelector(selectCurrentBoardProp("image"));

	const { id } = image;

	const uri = useInvestigatorImageUrl({
		code: id,
		type: "full",
	});

	const source = { uri };

	const imageLayout = getPortraitLayout({
		view,
		image,
	});

	const key = Platform.OS === "ios" ? id : permanentKey;

	return (
		<C.Container {...props}>
			<C.Content>
				{imageLayout && <C.Background source={source} layout={imageLayout} />}
			</C.Content>
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
