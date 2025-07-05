import { selectUnrevealedChaosTokensCount } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
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
			<C.Description />
		</C.Container>
	);
};
