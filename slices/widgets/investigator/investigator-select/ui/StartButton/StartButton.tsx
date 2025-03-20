import { useAppTranslation } from "@features/i18n";
import { getInvestigatorImageUrl } from "@shared/api/getInvestigatorImageUrl";
import {
	selectFocusedInvestigators,
	selectReplaceCode,
	selectReplaceInvestigator,
	selectSelectedInvestigators,
	useAppDispatch,
	useAppSelector,
	usePageLoader,
} from "@shared/lib";
import type { SelectedInvestigator } from "@shared/model";
import { useCallback } from "react";
import { replaceInvestigator, startGame } from "../../lib";
import * as C from "./StartButton.components";

const getImageSource = ({ code }: SelectedInvestigator) => ({
	uri: getInvestigatorImageUrl({
		code,
		type: "square",
	}),
});

export const StartButton = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const investigators = useAppSelector(selectSelectedInvestigators);
	const code = useAppSelector(selectReplaceCode);

	const start = useCallback(() => {
		if (!code) {
			dispatch(startGame());
			return;
		}
		dispatch(replaceInvestigator());
	}, [dispatch, code]);

	const onStart = usePageLoader(start);

	const title = t(code ? "Continue" : "Start");

	return (
		<C.Container onPress={onStart}>
			<C.Content>
				<C.Investigators>
					{investigators.map((item) => (
						<C.InvestigatorImage key={item.id} source={getImageSource(item)} />
					))}
				</C.Investigators>
				<C.Text>{title}</C.Text>
				<C.Icon icon="right-arrow" />
			</C.Content>
		</C.Container>
	);
};
