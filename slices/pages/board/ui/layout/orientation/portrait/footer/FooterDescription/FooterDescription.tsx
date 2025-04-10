import { useHapticFeedback } from "@features/haptic";
import { useRoute } from "@react-navigation/native";
import {
	selectCurrentBoardProp,
	selectCurrentFaction,
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useContext, useEffect } from "react";
import { BackHandler, StyleSheet, type ViewProps } from "react-native";
import { LayoutContext } from "../../../../../../config";
import * as C from "./FooterDescription.components";
import { useAnimation } from "./useAnimation";

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({ ...props }: FooterDescriptionProps) => {
	const route = useRoute();
	const dispatch = useAppDispatch();
	const showDescription = useAppSelector(selectShowDescription);

	const { view } = useContext(LayoutContext);
	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	const impactShowFeedback = useHapticFeedback("clockTick");

	const onShow = useCallback(() => {
		if (!showDescription) {
			dispatch(setShowDescription(true));
			impactShowFeedback();
		}
	}, [showDescription, dispatch, impactShowFeedback]);

	useEffect(() => {
		const onBack = () => {
			const isBoard = route.name === "board/index";
			if (showDescription && isBoard) {
				dispatch(setShowDescription(false));
				return true;
			}
			return false;
		};
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			onBack,
		);
		return () => backHandler.remove();
	}, [dispatch, showDescription, route]);

	const contentStyle = useAnimation();

	const vw = (view.width * 6) / 100;

	if (!vw) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Expand style={contentStyle}>
					{showDescription ? (
						<C.TopMenu />
					) : (
						<C.ExpandArea onPress={onShow} style={StyleSheet.absoluteFill} />
					)}

					<C.Background faction={faction} width={view.width}>
						<C.DescriptionContent>
							<C.TextContent>
								<C.Traits unit={vw} investigator={investigator} />
								{showDescription && (
									<>
										<C.Text investigator={investigator} unit={vw} />
										{investigator.flavor && (
											<C.Flavor unit={vw} investigator={investigator} />
										)}
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
