import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { goBack, useAppDispatch } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import * as C from "./ChaosBagPreview.components";
import { useData, useModalActions } from "./hooks";

export type ChaosBagPreviewProps = ViewProps;

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const data = useData();
	const isEmpty = data.regular.length === 0 && data.sealed.length === 0;

	const toggleSeal = useCallback(
		(id: string) => () => {
			dispatch(toggleChaosTokenSeal({ id }));
		},
		[dispatch],
	);

	const onClose = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const reveal = useCallback(() => {
		dispatch(goBack());

		dispatch(
			startChaosBagReveal({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	const renderTokenRow = useCallback(
		(info: ListRenderItemInfo<ChaosBagToken[]>) => {
			const tokens = info.item;
			return (
				<C.TokenRow>
					{tokens.map((token) => (
						<C.TokenButton
							key={token.id}
							onLongPress={toggleSeal(token.id)}
							activeOpacity={1}
						>
							<C.Token {...token} />
						</C.TokenButton>
					))}
				</C.TokenRow>
			);
		},
		[toggleSeal],
	);

	const actions = useModalActions();

	return (
		<C.Container
			{...props}
			title="Chaos Bag"
			actions={actions}
			onClose={onClose}
		>
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
						<C.Sealed>
							<C.Title>{t`Sealed Tokens`}</C.Title>
							<C.List
								data={data.sealed}
								renderItem={renderTokenRow}
								removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
							/>
						</C.Sealed>
					)}
				</Delay>
				<C.BlessCurse />
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
