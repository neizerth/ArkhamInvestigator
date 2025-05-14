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

	if (!vw) {
		return null;
	}

	const showFlavor = investigator.flavor && (!gameText.show || showDescription);
	const showTraits = !gameText.show || showDescription;

	const textUnit = gameText.showSmallText ? vw * 0.9 : vw;

	return (
		<C.Container {...props} style={[props.style, containerStyle]}>
			<C.Content>
				{!showDescription && (
					<C.ExpandArea
						actionCreator={setShowDescription}
						style={expandStyle}
					/>
				)}
				<C.TopContent />
				<C.Background faction={faction} width={view.width}>
					<C.DescriptionContent>
						<C.TextContent>
							{showTraits && <C.Traits unit={vw} investigator={investigator} />}
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
	);
};
