import { memo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImageBackground.components";
import { useBackground } from "./hooks";

export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const backgroundProps = useBackground();

	return (
		<C.Container {...props}>
			<C.NextBackground {...backgroundProps} />
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
