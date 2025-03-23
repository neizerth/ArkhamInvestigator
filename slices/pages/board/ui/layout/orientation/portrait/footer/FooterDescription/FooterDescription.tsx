import { impactHapticFeedback } from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import { LayoutContext } from "@pages/board/config";
import {
	goToPage,
	resetBoard,
	selectCurrentBoard,
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Faction } from "@shared/model";
import { useCallback, useContext, useEffect, useRef } from "react";
import { BackHandler, PanResponder, StyleSheet, type ViewProps } from "react-native";
import * as C from "./FooterDescription.components";
import { useAnimation } from "./useAnimation";
import { useFaction } from "@pages/board/lib";
import { useRoute } from "@react-navigation/native";
import { routes } from "@shared/config";

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({ ...props }: FooterDescriptionProps) => {
	const route = useRoute();
	const dispatch = useAppDispatch();
	const showDescription = useAppSelector(selectShowDescription);

	const { view } = useContext(LayoutContext);
	const board = useAppSelector(selectCurrentBoard);
	const investigator = board?.investigator;
	const { faction } = useFaction();

	const onShow = useCallback(() => {
		if (!showDescription) {
			dispatch(setShowDescription(true));
			impactHapticFeedback("clockTick");
		}
	}, [showDescription, dispatch]);

	useEffect(() => {
		const onBack = () => {
			const isBoard = route.name === 'board/index';
			if (showDescription && isBoard) {
				dispatch(setShowDescription(false));
				return true;
			}
			return false;
		}
		const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
		return () => backHandler.remove();
	}, [dispatch, showDescription, route]);

	const contentStyle = useAnimation();

	const vw = (view.width * 6) / 100;

	if (!vw || !investigator) {
		return null;
	}

	const { traits = "", flavor, text } = investigator;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Expand style={contentStyle}>
					{showDescription ? (
						<C.TopMenu/>
					) : (
						<C.ExpandArea onPress={onShow} style={StyleSheet.absoluteFill} />
					)}

					<C.Background faction={faction} width={view.width}>
						<C.DescriptionContent>
							<C.TextContent>
								<C.Traits unit={vw} value={traits} />
								{showDescription && (
									<>
										<C.Text value={text} unit={vw} />
										{flavor && <C.Flavor unit={vw} value={flavor} />}
									</>
								)}
							</C.TextContent>
							<C.Menu />
						</C.DescriptionContent>
					</C.Background>
				</C.Expand>
			</C.Content>
		</C.Container>
	);
};
