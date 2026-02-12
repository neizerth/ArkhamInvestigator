import { usePageLoader } from "@modules/core/router/shared/lib";
import { startGame } from "@modules/game/entities/startGame";
import { selectIsClientGame } from "@modules/multiplayer/entities/lib";
import {
	selectReplaceSignature,
	selectSelectedSignatures,
} from "@modules/signature/signature-selection/shared/lib";
import { getActiveOpacity, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./StartButton.components";

export const StartButton = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const selectedSignatures = useAppSelector(selectSelectedSignatures);
	const replaceSignature = useAppSelector(selectReplaceSignature);
	const isClient = useAppSelector(selectIsClientGame);
	const signatures = selectedSignatures ?? [];

	const start = useCallback(() => {
		if (isClient) {
			return;
		}
		dispatch(startGame());
	}, [dispatch, isClient]);

	const [onStart] = usePageLoader(start);

	const label = replaceSignature ? t`Continue` : t`Start`;

	const activeOpacity = getActiveOpacity(!isClient);

	return (
		<C.Container onPress={onStart} activeOpacity={activeOpacity}>
			<C.Content>
				<C.Investigators signatures={signatures} />
				{isClient ? (
					<C.Waiting />
				) : (
					<>
						<C.TextContainer>
							<C.Text>{label}</C.Text>
						</C.TextContainer>

						<C.Icon icon="right-arrow" />
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
