import { memo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImageBackground.components";
import { useCurrentBackground } from "./hooks";
export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const background = useCurrentBackground();

	return (
		<C.Container {...props}>
			<C.Background {...background} />
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
