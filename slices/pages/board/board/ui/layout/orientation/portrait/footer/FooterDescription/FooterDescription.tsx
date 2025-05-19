import { useHapticSwipe } from "@features/haptic";
import { useRoute } from "@react-navigation/native";
import {
	selectCurrentBoardProp,
	selectCurrentFaction,
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
	useBackButton,
	useFadeAnimation,
} from "@shared/lib";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import { Directions, GestureDetector } from "react-native-gesture-handler";
import { LayoutContext } from "../../../../../../config";
import { TOP_CONTENT_OFFSET } from "../top";
import * as C from "./FooterDescription.components";
import { useGameText } from "./hooks";
import { useContainerAnimation } from "./hooks/useContainerAnimation";

export type FooterDescriptionProps = ViewProps;
export const FooterDescription = ({ ...props }: FooterDescriptionProps) => {
	const dispatch = useAppDispatch();
	const route = useRoute();
	const showDescription = useAppSelector(selectShowDescription);
	const gameText = useGameText();

	const { view } = useContext(LayoutContext);
	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	const onBack = useCallback(() => {
		const isBoard = route.name === "board/index";
		if (showDescription && isBoard) {
			dispatch(setShowDescription(false));
			return true;
		}
		return false;
	}, [dispatch, showDescription, route]);

	useBackButton(onBack);

	const descriptionStyle = useFadeAnimation({
		show: showDescription || gameText.show,
	});

	const containerStyle = useContainerAnimation({
		offsetTop: TOP_CONTENT_OFFSET,
	});

	const expandStyle = {
		top: TOP_CONTENT_OFFSET,
	};

	const vw = (view.width * 6) / 100;

	const createToggleDescription = useCallback(
		(show: boolean) => () => {
			if (show === showDescription) {
				return false;
			}
			dispatch(setShowDescription(show));
		},
		[dispatch, showDescription],
	);

	const onSwipeUp = createToggleDescription(true);

	const onSwipeDown = createToggleDescription(false);

	const swipeUp = useHapticSwipe({
		direction: Directions.UP,
		onSwipe: onSwipeUp,
	});

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: onSwipeDown,
	});

	if (!vw) {
		return null;
	}

	const showFlavor = investigator.flavor && (!gameText.show || showDescription);
	const showTraits = !gameText.show || showDescription;

	const textUnit = gameText.showSmallText ? vw * 0.9 : vw;

	return (
		<GestureDetector gesture={swipeDown}>
			<C.Container {...props} style={[props.style, containerStyle]}>
				<C.Content>
					{!showDescription && (
						<GestureDetector gesture={swipeUp}>
							<C.ExpandArea
								actionCreator={setShowDescription}
								style={expandStyle}
							/>
						</GestureDetector>
					)}
					<C.TopContent />
					<C.Background faction={faction} width={view.width}>
						<C.DescriptionContent>
							<C.TextContent>
								{showTraits && (
									<C.Traits unit={vw} investigator={investigator} />
								)}
								<C.Description
									style={descriptionStyle}
									onLayout={gameText.onLayout}
								>
									<C.Text investigator={investigator} unit={textUnit} />
									{showFlavor && (
										<C.Flavor unit={vw} investigator={investigator} />
									)}
								</C.Description>
							</C.TextContent>
							<C.Menu />
						</C.DescriptionContent>
					</C.Background>
				</C.Content>
			</C.Container>
		</GestureDetector>
	);
};
