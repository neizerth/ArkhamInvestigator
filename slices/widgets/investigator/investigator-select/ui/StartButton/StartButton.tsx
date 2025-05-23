import { useAppTranslation } from "@features/i18n";
import { getInvestigatorImageUrl } from "@shared/api/getInvestigatorImageUrl";
import {
	selectSelectedInvestigators,
	useAppDispatch,
	useAppSelector,
	usePageLoader,
} from "@shared/lib";
import type { SelectedInvestigator } from "@shared/model";
import { useCallback } from "react";
import { startGame } from "../../lib";
import * as C from "./StartButton.components";

const getImageSource = ({ code, image }: SelectedInvestigator) => ({
	uri: getInvestigatorImageUrl({
		code: image.id || code,
		type: "square",
	}),
});

export const StartButton = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
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
						<C.InvestigatorImage key={item.id} source={getImageSource(item)} />
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
