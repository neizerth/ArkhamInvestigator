import { usePage } from "@modules/core/router/shared/lib";
import { openThemeModal } from "@modules/core/theme/entities/openThemeModal";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./HomeMenu.components";

export type HomeMenuProps = ViewProps;

export const HomeMenu = (props: HomeMenuProps) => {
	const goTo = usePage();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const handleOpenThemeModal = useCallback(() => {
		dispatch(openThemeModal());
	}, [dispatch]);
	return (
		<C.Container {...props}>
			<C.ContentRow>
				<C.Left>
					<C.Button onPress={goTo(routes.about)}>
						<C.Icon icon="name" />
					</C.Button>

					<C.Button onPress={goTo(routes.boardHelp)}>
						<C.Icon icon="info" />
					</C.Button>

					<C.Button onPress={goTo(routes.support)}>
						<C.Icon icon="heart" />
					</C.Button>
				</C.Left>
				<C.Right>
					<C.Button onPress={handleOpenThemeModal}>
						<C.ThemeIcon icon="paint-format" />
					</C.Button>
					<C.Button onPress={goTo(routes.settings)}>
						<C.Icon icon="wrench" />
					</C.Button>
				</C.Right>
			</C.ContentRow>
			{!artworksEnabled && (
				<C.ContentRow>
					<C.Hint>{t("theme.installHint")}</C.Hint>
				</C.ContentRow>
			)}
		</C.Container>
	);
};
