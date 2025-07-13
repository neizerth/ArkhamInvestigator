import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import { init } from "ramda";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./TopPanel.components";

export type TopPanelProps = ViewProps;

export const TopPanel = (props: TopPanelProps) => {
	const tokens = useAppSelector(selectRevealedTokens);

	const history = useMemo(() => {
		return tokens.length > 1 ? tokens : init(tokens);
	}, [tokens]);

	return (
		<C.Container {...props}>
			<C.History tokens={history} />
			<C.BlessCurse />
		</C.Container>
	);
};
