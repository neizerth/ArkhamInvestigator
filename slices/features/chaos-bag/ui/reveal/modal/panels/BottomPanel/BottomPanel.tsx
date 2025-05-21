import { useAppSelector } from "@shared/lib";
import { last } from "ramda";
import type { ViewProps } from "react-native";
import {
	selectRevealedTokens,
	selectUnrevealedChaosTokensCount,
	useChaosBagTokenReference,
} from "../../../../../lib";
import * as C from "./BottomPanel.components";

export type BottomPanelProps = ViewProps & {
	onClose?: () => void;
	onLoadMore?: () => void;
	onReturnTokens?: () => void;
};

export const BottomPanel = ({
	onClose,
	onLoadMore,
	onReturnTokens,
	...props
}: BottomPanelProps) => {
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const tokens = useAppSelector(selectRevealedTokens);
	const reference = useChaosBagTokenReference();
	const lastToken = last(tokens);

	const description = lastToken && reference[lastToken.type];
	return (
		<C.Container {...props}>
			<C.Actions>
				<C.Return onPress={onClose}>
					<C.ReturnAllIcon icon="reply" />
				</C.Return>

				{unrevealedCount > 0 && (
					<C.RevealMore onPressOut={onLoadMore}>
						<C.RevealMoreIcon icon="token_plus_highlight" />
					</C.RevealMore>
				)}
				<C.Return onPress={onReturnTokens}>
					<C.ReturnFillIcon icon="token_symbol_fill" />
					<C.ReturnIcon icon="token_dismiss_highlight" />
				</C.Return>
			</C.Actions>
			{description && (
				<C.Description>
					<C.DescriptionText value={description} />
				</C.Description>
			)}
		</C.Container>
	);
};
