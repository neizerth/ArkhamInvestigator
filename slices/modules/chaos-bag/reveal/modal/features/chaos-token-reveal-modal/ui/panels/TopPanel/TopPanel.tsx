import {
	selectCurrentRevealedTokenId,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { init, last } from "ramda";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./TopPanel.components";

export type TopPanelProps = ViewProps;

export const TopPanel = (props: TopPanelProps) => {
	const tokens = useAppSelector(selectRevealedTokens);
	const currentTokenId = useAppSelector(selectCurrentRevealedTokenId);
	const lastTokenId = last(tokens)?.id;

	const showAll = currentTokenId !== lastTokenId;

	const history = useMemo(() => {
		return showAll ? tokens : init(tokens);
	}, [tokens, showAll]);

	return (
		<C.Container {...props}>
			<C.History tokens={history} />
			<C.BlessCurse />
		</C.Container>
	);
};
