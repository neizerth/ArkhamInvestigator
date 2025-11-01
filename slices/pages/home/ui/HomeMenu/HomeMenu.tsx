import { usePage } from "@modules/core/router/shared/lib";
import { openArtworkModal } from "@modules/core/theme/entities/lib/store/features/openArtworkModal";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./HomeMenu.components";

export type HomeMenuProps = ViewProps;

export const HomeMenu = (props: HomeMenuProps) => {
	const goTo = usePage();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const handleOpenThemeModal = useCallback(() => {
		dispatch(openArtworkModal());
	}, [dispatch]);
	return (
		<C.Container {...props}>
			<C.ContentRow>
				<C.Left>
					<C.Button onPress={goTo(routes.about)}>
						<C.Icon icon="name" />
					</C.Button>

					<ArtworksFragment>
						<C.Button onPress={goTo(routes.boardHelp)}>
							<C.Icon icon="info" />
						</C.Button>
					</ArtworksFragment>

					<C.Button onPress={goTo(routes.support)}>
						<C.Icon icon="heart" />
					</C.Button>
				</C.Left>
				<C.Right>
					<ArtworksFragment disabled>
						<C.Button onPress={handleOpenThemeModal}>
							<C.ThemeIcon icon="images" />
						</C.Button>
					</ArtworksFragment>
					<C.Button onPress={goTo(routes.settings)}>
						<C.Icon icon="wrench" />
					</C.Button>
				</C.Right>
			</C.ContentRow>
			<ArtworksFragment disabled>
				<C.ContentRow>
					<C.Hint>{t("theme.installHint")}</C.Hint>
				</C.ContentRow>
			</ArtworksFragment>
		</C.Container>
	);
};
