import { routes } from "@shared/config";
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
import {
	Dimensions,
	type ListRenderItemInfo,
	type ViewProps,
} from "react-native";
import { useAppTranslation } from "../../../i18n";
import {
	selectOrderedChaosBagContents,
	setShowRevealChaosTokenModal,
	toggleChaosTokenSeal,
} from "../../lib";
import type { ChaosBagToken } from "../../model";
import * as C from "./ChaosBagPreview.components";

export type ChaosBagPreviewProps = ViewProps;

const screenWidth = Dimensions.get("screen").width;
const tokenSize = 64;
const columns = Math.round(screenWidth / tokenSize);

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const tokens = useAppSelector(selectOrderedChaosBagContents);

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
	}, [tokens]);

	const goTo = useCallback(
		(href: Href) => async () => {
			dispatch(goBack());
			await delay(300);
			dispatch(goToPage(href));
		},
		[dispatch],
	);

	const onEdit = goTo(routes.chaosBag);
	const onHistory = goTo(routes.chaosBagHistory);

	const toggleSeal = useCallback(
		(id: string) => () => {
			dispatch(toggleChaosTokenSeal(id));
		},
		[dispatch],
	);

	const reveal = useCallback(() => {
		dispatch(goBack());

		dispatch(setShowRevealChaosTokenModal(true));
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
		return [
			{
				icon: "edit",
				onAction: onEdit,
			},
			{
				icon: "history",
				onAction: onHistory,
			},
		];
	}, [onEdit, onHistory]);

	return (
		<C.Container {...props} title="Chaos Bag" actions={actions}>
			<C.Content>
				<Delay>
					{tokens.length > 0 && data.sealed.length === 0 && (
						<C.Hint>{t`Hold to seal`}</C.Hint>
					)}
					{data.regular.length > 0 && (
						<C.List
							data={data.regular}
							renderItem={renderTokenRow}
							removeClippedSubviews={false}
						/>
					)}

					{data.sealed.length > 0 && (
						<C.Sealed>
							<C.Title>{t`Sealed Tokens`}</C.Title>
							<C.List
								data={data.sealed}
								renderItem={renderTokenRow}
								removeClippedSubviews={false}
							/>
						</C.Sealed>
					)}

					<C.BlessCurse />
				</Delay>
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
