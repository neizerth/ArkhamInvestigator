import { usePageLoader } from "@modules/core/router/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import {
	selectSelectedInvestigators,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SelectedInvestigator } from "@shared/model";
import { Fragment, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { startGame } from "../../lib";
import * as C from "./StartButton.components";

const getImageSource = ({ code, image }: SelectedInvestigator) => ({
	uri: getSignatureImageUrl({
		code: image.id || code,
		type: "square",
	}),
});

export const StartButton = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const investigators = useAppSelector(selectSelectedInvestigators);

	const start = useCallback(() => {
		dispatch(startGame());
	}, [dispatch]);

	const [onStart] = usePageLoader(start);

	return (
		<C.Container onPress={onStart}>
			<C.Content>
				<C.Investigators>
					{investigators.map((item) => (
						<Fragment key={item.id}>
							{artworksEnabled ? (
								<C.InvestigatorImage source={getImageSource(item)} />
							) : (
								<C.Faction
									faction={item.signature.faction_code}
									colored
									light
								/>
							)}
						</Fragment>
					))}
				</C.Investigators>
				<C.TextContainer>
					<C.Text>{t`Start`}</C.Text>
				</C.TextContainer>
				<C.Icon icon="right-arrow" />
			</C.Content>
		</C.Container>
	);
};
