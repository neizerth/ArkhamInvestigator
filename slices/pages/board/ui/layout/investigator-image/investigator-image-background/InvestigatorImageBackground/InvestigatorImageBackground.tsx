import { selectCurrentBoardProp, useAppSelector } from "@shared/lib";
import { memo, useContext } from "react";
import type { ViewProps } from "react-native";
import { LayoutContext } from "../../../../../config";
import { getPortraitLayout } from "../../../../../lib";
import * as C from "./InvestigatorImageBackground.components";

export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const { view } = useContext(LayoutContext);

	const image = useAppSelector(selectCurrentBoardProp("image"));

	const { id } = image;

	const imageLayout = getPortraitLayout({
		view,
		image,
	});

	return (
		<C.Container {...props}>
			{imageLayout && <C.Background code={id} layout={imageLayout} />}
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
