import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { Outside } from "@shared/ui";
import { init, last } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import { useAppTranslation } from "../../../../i18n";
import {
	returnChaosToken,
	returnChaosTokens,
	revealChaosToken,
	selectCurrentChaosBagContents,
	selectRevealedTokens,
	selectShowRevealChaosTokenModal,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
	toggleChaosTokenSeal,
} from "../../../lib";
import type { ChaosBagToken } from "../../../model";
import * as C from "./ChaosTokenRevealModal.components";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const [oneMoreLoading, setOneMoreLoading] = useBoolean();
	const show = useAppSelector(selectShowRevealChaosTokenModal);
	const tokens = useAppSelector(selectRevealedTokens);
	const unsealed = useAppSelector(selectCurrentChaosBagContents);

	const onLoad = useCallback(() => {
		setOneMoreLoading.off();
		dispatch(revealChaosToken(1));
	}, [dispatch, setOneMoreLoading.off]);

	const closeModal = useCallback(() => {
		dispatch(setRevealedTokenIds([]));
		dispatch(setShowRevealChaosTokenModal(false));
	}, [dispatch]);

	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(returnChaosToken(token));
			if (tokens.length > 1) {
				return;
			}
			closeModal();
		},
		[dispatch, closeModal, tokens],
	);

	const returnTokens = useCallback(() => {
		dispatch(returnChaosTokens());
		closeModal();
	}, [dispatch, closeModal]);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(toggleChaosTokenSeal(token.id));
		},
		[dispatch],
	);

	const history = useMemo(() => {
		return init(tokens);
	}, [tokens]);

	if ((!show && tokens.length === 0) || unsealed.length === 0) {
		return null;
	}

	if (tokens.length === 0) {
		return <C.Loader {...props} duration={3000} onLoad={onLoad} show={show} />;
	}

	const lastToken = last(tokens) as ChaosBagToken;

	return (
		<C.Container {...props}>
			<Outside onPress={closeModal} />
			<C.Content>
				<C.TopView>
					<C.History tokens={history} />
					<C.BlessCurse />
				</C.TopView>
				<C.LeftView>
					<C.SideActions>
						<C.Return onPress={closeModal}>
							<C.ReturnAllIcon icon="reply" />
						</C.Return>
					</C.SideActions>
				</C.LeftView>

				<C.BottomView>
					<C.Actions>
						<C.Return onPress={returnTokens}>
							<C.ReturnFillIcon icon="token_symbol_fill" />
							<C.ReturnIcon icon="token_dismiss_highlight" />
						</C.Return>
						<C.RevealMore
							onPressIn={setOneMoreLoading.on}
							onPressOut={setOneMoreLoading.off}
						>
							<C.RevealMoreIcon icon="token_plus_highlight" />
						</C.RevealMore>
					</C.Actions>
				</C.BottomView>

				<C.TokenButton
					activeOpacity={1}
					onPress={onTokenPress(lastToken)}
					onLongPress={toggleSeal(lastToken)}
				>
					<C.LastToken {...lastToken} tokenPadding={5} sealOffset={5} />
				</C.TokenButton>
				{oneMoreLoading && (
					<C.OneMoreLoader duration={2000} onLoad={onLoad} show />
				)}
			</C.Content>
		</C.Container>
	);
};
