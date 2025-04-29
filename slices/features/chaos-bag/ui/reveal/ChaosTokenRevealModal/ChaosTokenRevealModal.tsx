import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { init, last } from "ramda";
import { useCallback, useEffect, useMemo } from "react";
import type { ViewProps } from "react-native";
import { useAppTranslation } from "../../../../i18n";
import {
	closeRevealChaosTokenModal,
	returnChaosToken,
	returnChaosTokens,
	revealChaosToken,
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
	selectRevealedTokens,
	selectShowRevealChaosTokenModal,
	selectUnrevealedChaosTokensCount,
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
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	const isEmpty = tokens.length === 0 && unrevealedCount === 0;

	const showModal = tokens.length > 0 || unrevealedCount > 0 || show;

	const reveal = useCallback(() => {
		setOneMoreLoading.off();
		dispatch(revealChaosToken(1));
	}, [dispatch, setOneMoreLoading.off]);

	const closeModal = useCallback(() => {
		dispatch(closeRevealChaosTokenModal());
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

	const hideModal = !showModal || isEmpty;

	useEffect(() => {
		if (show && hideModal) {
			closeModal();
		}
	}, [hideModal, show, closeModal]);

	if (hideModal) {
		return null;
	}

	if (tokens.length === 0) {
		return <C.Loader {...props} onLoad={reveal} show={show} />;
	}

	const lastToken = last(tokens) as ChaosBagToken;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.TopView>
					<C.History tokens={history} />
					<C.BlessCurse />
				</C.TopView>
				<C.LeftView>
					<C.LeftActions>
						<C.SkillValue>
							{skillValue && <C.SkillValueText value={skillValue} />}
							{skillType && (
								<C.SkillType>
									<C.SkillTypeIcon statType={skillType} />
								</C.SkillType>
							)}
						</C.SkillValue>
						<C.Return onPress={closeModal}>
							<C.ReturnAllIcon icon="reply" />
						</C.Return>
					</C.LeftActions>
				</C.LeftView>

				<C.BottomView>
					<C.Actions>
						<C.Return onPress={returnTokens}>
							<C.ReturnFillIcon icon="token_symbol_fill" />
							<C.ReturnIcon icon="token_dismiss_highlight" />
						</C.Return>
						{unrevealedCount > 0 && (
							<C.RevealMore onPress={setOneMoreLoading.on}>
								<C.RevealMoreIcon icon="token_plus_highlight" />
							</C.RevealMore>
						)}
					</C.Actions>
				</C.BottomView>

				<C.TokenButton
					activeOpacity={1}
					onPress={onTokenPress(lastToken)}
					onLongPress={toggleSeal(lastToken)}
				>
					<C.LastToken {...lastToken} />
				</C.TokenButton>
				{oneMoreLoading && (
					<C.OneMoreLoaderCancel
						onPress={setOneMoreLoading.off}
						activeOpacity={1}
					>
						<C.OneMoreLoader onLoad={reveal} duration={500} show />
					</C.OneMoreLoaderCancel>
				)}
			</C.Content>
		</C.Container>
	);
};
