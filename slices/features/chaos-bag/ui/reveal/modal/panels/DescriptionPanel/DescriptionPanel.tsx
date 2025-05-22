import { useAppSelector } from "@shared/lib";
import { last } from "ramda";
import type { ViewProps } from "react-native";
import {
	selectCurrentToken,
	selectRevealedTokenIds,
	useChaosBagTokenReference,
} from "../../../../../lib";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const currentToken = useAppSelector(selectCurrentToken);
	const tokenIds = useAppSelector(selectRevealedTokenIds);
	const reference = useChaosBagTokenReference();

	const description = currentToken && reference[currentToken.type];
	const lastId = last(tokenIds);

	const isLastToken = !currentToken || currentToken.id === lastId;

	if (!description) {
		return null;
	}

	return (
		<C.Container {...props} last={isLastToken}>
			<C.Description value={description} />
		</C.Container>
	);
};
