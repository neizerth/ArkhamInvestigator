import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	selectCurrentToken,
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
	const currentToken = useAppSelector(selectCurrentToken);
	const reference = useChaosBagTokenReference();

	const description = currentToken && reference[currentToken.type];
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
