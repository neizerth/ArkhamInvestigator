import {
	endChaosBagReveal,
	returnAllChaosTokens,
	selectCanRevealChaosTokens,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { selectCurrentRevealedToken } from "../../../../../lib";
import * as C from "./BottomPanel.components";
import { useOneMoreChaosToken } from "./useOneMoreChaosToken";

export type BottomPanelProps = ViewProps;

export const BottomPanel = ({ ...props }: BottomPanelProps) => {
	const dispatch = useAppDispatch();

	const token = useAppSelector(selectCurrentRevealedToken);
	const { canReveal } = useAppSelector(selectCanRevealChaosTokens(1));

	const returnTokens = useCallback(() => {
		dispatch(returnAllChaosTokens());
	}, [dispatch]);

	const onClose = useCallback(() => {
		dispatch(endChaosBagReveal());
	}, [dispatch]);

	const loadMore = useOneMoreChaosToken();

	return (
		<C.Container {...props}>
			<C.Actions>
				{/* retry */}
				<C.Return onPress={onClose}>
					<C.ReturnAllIcon icon="reply" />
				</C.Return>

				{canReveal && (
					<C.RevealMore onPressOut={loadMore}>
						<C.RevealMoreIcon icon="token_plus_highlight" />
					</C.RevealMore>
				)}
				{token && <C.EffectSwitch token={token} />}
				<C.Return onPress={returnTokens}>
					<C.ReturnFillIcon icon="token_symbol_fill" />
					<C.ReturnIcon icon="token_dismiss_highlight" />
				</C.Return>
			</C.Actions>
			<C.Description />
		</C.Container>
	);
};
