import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { prop } from "ramda";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import * as C from "./ChaosBagPreview.components";
import { type DisabledChaosToken, useData, useModalActions } from "./hooks";

export type ChaosBagPreviewProps = ViewProps;

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const revealed = useAppSelector(selectRevealedTokens);
	const revealedIds = revealed.map(prop("id"));

	const data = useData();
	const isEmpty = data.regular.length === 0 && data.sealed.length === 0;

	const [selectedToken, setSelectedToken] = useState<DisabledChaosToken | null>(
		null,
	);

	const selectedId = selectedToken?.id;

	const selectToken = useCallback(
		(token: DisabledChaosToken) => {
			if (token.disabled) {
				return false;
			}

			if (selectedId === token.id) {
				setSelectedToken(null);
				return;
			}

			setSelectedToken(token);
		},
		[selectedId],
	);

	const toggleSeal = useCallback(
		(id: string) => () => {
			dispatch(
				toggleChaosTokenSeal({
					id,
					boardId: "current",
				}),
			);
		},
		[dispatch],
	);

	const back = useGoBack();

	const reveal = useCallback(() => {
		back();

		dispatch(
			startChaosBagReveal({
				boardId: "current",
			}),
		);
	}, [dispatch, back]);

	const renderTokenRow = useCallback(
		(info: ListRenderItemInfo<DisabledChaosToken[]>) => {
			const tokens = info.item;

			return (
				<C.TokenRow>
					{tokens.map((token) => (
						<C.Token
							key={token.id}
							token={token}
							onPress={() => selectToken(token)}
							onLongPress={toggleSeal(token.id)}
							selected={selectedId === token.id}
							disabled={token.disabled}
						/>
					))}
				</C.TokenRow>
			);
		},
		[toggleSeal, selectedId, selectToken],
	);

	const actions = useModalActions();

	return (
		<C.Container {...props} title="Chaos Bag" actions={actions} onClose={back}>
			<C.Content>
				<Delay>
					{isEmpty && <C.Hint>{t`Chaos bag is empty`}</C.Hint>}
					{!isEmpty && data.sealed.length === 0 && (
						<C.Hint>{t`Hold to seal`}</C.Hint>
					)}
					{data.regular.length > 0 && (
						<C.List
							data={data.regular}
							renderItem={renderTokenRow}
							removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
						/>
					)}

					{data.sealed.length > 0 && (
						<C.Sealed only={data.regular.length === 0}>
							<C.Hint>{t`Sealed Tokens`}</C.Hint>
							<C.List
								data={data.sealed}
								renderItem={renderTokenRow}
								removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
							/>
						</C.Sealed>
					)}
				</Delay>
				<C.BlessCurse incrementLongPressEnabled />
				{!isEmpty && (
					<C.RevealButton
						onPress={reveal}
						icon="token_sealed_outline"
						text={t`Draw chaos tokens`}
					/>
				)}
			</C.Content>
		</C.Container>
	);
};
