import { routes } from "@shared/config";
import {
	delay,
	goBack,
	goToPage,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import { useAppTranslation } from "../../../i18n";
import { selectOrderedChaosBagContents, toggleChaosTokenSeal } from "../../lib";
import * as C from "./ChaosBagPreview.components";

export type ChaosBagPreviewProps = ViewProps;

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const tokens = useAppSelector(selectOrderedChaosBagContents);

	const data = useMemo(() => {
		return {
			regular: tokens.filter((item) => !item.sealed),
			sealed: tokens.filter((item) => item.sealed),
		};
	}, [tokens]);

	const onEdit = useCallback(async () => {
		dispatch(goBack());
		await delay(200);
		dispatch(goToPage(routes.chaosBag));
	}, [dispatch]);

	const toggleSeal = useCallback(
		(id: string) => () => {
			dispatch(toggleChaosTokenSeal(id));
		},
		[dispatch],
	);

	return (
		<C.Container
			{...props}
			title="Chaos Bag"
			actionIcon="edit"
			onAction={onEdit}
		>
			<C.BlessCurse />
			{data.sealed.length > 0 ? (
				<C.Sealed>
					<C.Title>{t`Sealed Tokens`}</C.Title>
					<C.List>
						{data.sealed.map((token) => (
							<C.TokenButton
								key={token.id}
								onLongPress={toggleSeal(token.id)}
								activeOpacity={1}
							>
								<C.Token {...token} />
							</C.TokenButton>
						))}
					</C.List>
				</C.Sealed>
			) : (
				<C.Hint>{t`Hold to seal`}</C.Hint>
			)}

			<C.List>
				{data.regular.map((token) => (
					<C.TokenButton
						key={token.id}
						onLongPress={toggleSeal(token.id)}
						activeOpacity={1}
					>
						<C.Token {...token} />
					</C.TokenButton>
				))}
			</C.List>
		</C.Container>
	);
};
