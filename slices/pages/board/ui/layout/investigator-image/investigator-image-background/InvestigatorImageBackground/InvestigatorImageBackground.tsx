import {
	selectCurrentBoardProp,
	useAppSelector,
	useInvestigatorImageUrl,
} from "@shared/lib";
import { memo, useCallback, useContext, useEffect, useState } from "react";
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
	const { view, layout } = useContext(LayoutContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
	}, []);

	const changeLoading = useCallback(
		(loading: boolean) => () => setLoading(loading),
		[],
	);

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
		<C.Container {...props} layout={layout}>
			<C.Content>
				{imageLayout && (
					<C.Background key={key} source={source} layout={imageLayout} />
				)}
			</C.Content>
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
