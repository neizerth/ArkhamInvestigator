import { memo } from "react";
import type { ViewProps } from "react-native";
import { useCurrentBackground } from "../lib";
import * as C from "./InvestigatorImageBackground.components";
export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const background = useCurrentBackground();

	return (
		<C.Container {...props}>
			{background && <C.Background {...background} type="full" />}
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
