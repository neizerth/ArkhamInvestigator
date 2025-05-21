import { REMOVE_CLIPPED_SUBVIEWS, routes } from "@shared/config";
import {
	delay,
	goBack,
	goToPage,
	splitIntoGroups,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { Delay } from "@shared/ui";
import type { Href } from "expo-router";
import { useCallback, useMemo } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import { useAppTranslation } from "../../../i18n";
import {
	openRevealChaosTokenModal,
	selectOrderedChaosBagContents,
	selectRevealHistory,
	toggleChaosTokenSeal,
} from "../../lib";
import type { ChaosBagToken } from "../../model";
import * as C from "./ChaosBagPreview.components";
import { useListColumns } from "./useListColumns";

export type ChaosBagPreviewProps = ViewProps;

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const tokens = useAppSelector(selectOrderedChaosBagContents);
	const isEmpty = tokens.length === 0;
	const showHistory = useAppSelector(
		(state) => selectRevealHistory(state).length > 0,
	);

	const columns = useListColumns();

	const data = useMemo(() => {
		return {
			regular: splitIntoGroups(
				tokens.filter((item) => !item.sealed),
				columns,
			),
			sealed: splitIntoGroups(
				tokens.filter((item) => item.sealed),
				columns,
			),
		};
	}, [tokens, columns]);

	const goTo = useCallback(
		(href: Href) => async () => {
			dispatch(goBack());
			await delay(300);
			dispatch(goToPage(href));
		},
		[dispatch],
	);

	const toggleSeal = useCallback(
		(id: string) => () => {
			dispatch(toggleChaosTokenSeal(id));
		},
		[dispatch],
	);

	const reveal = useCallback(() => {
		dispatch(goBack());

		dispatch(openRevealChaosTokenModal());
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

	const actions = useMemo(() => {
		const edit = {
			icon: "edit",
			onAction: goTo(routes.chaosBag),
		};
		const history = {
			icon: "history",
			onAction: goTo(routes.chaosBagHistory),
		};

		const reference = {
			icon: "list2",
			onAction: goTo(routes.chaosBagReference),
		};

		if (!showHistory) {
			return [edit, reference];
		}

		return [edit, reference, history];
	}, [goTo, showHistory]);

	return (
		<C.Container {...props} title="Chaos Bag" actions={actions}>
			<C.Content>
				<Delay>
					{isEmpty && <C.Hint>{t`Chaos bag is empty`}</C.Hint>}
					{tokens.length > 0 && data.sealed.length === 0 && (
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
				{tokens.length > 0 && (
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
