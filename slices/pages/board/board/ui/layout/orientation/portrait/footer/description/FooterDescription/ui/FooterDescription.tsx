import { useDescriptionLayout } from "@modules/board/base/entities/description/lib";
import {
	selectCurrentBoardProp,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector, useFadeAnimation } from "@shared/lib";
import { Dimensions, type ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { TOP_CONTENT_OFFSET } from "../../../../../../../../config";
import {
	useContainerAnimation,
	useDescriptionBackButton,
	useDescriptionGestures,
	useGameText,
} from "../lib";
import * as C from "./FooterDescription.components";

const screen = Dimensions.get("screen");
const vw = (screen.width * 6) / 100;

export type FooterDescriptionProps = ViewProps;
export const FooterDescription = ({ ...props }: FooterDescriptionProps) => {
	const gameText = useGameText();
	const onLayout = useDescriptionLayout();

	const showDescription = useAppSelector(selectShowDescription);

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	useDescriptionBackButton();

	const showText = showDescription || gameText.show;

	const descriptionStyle = useFadeAnimation({
		show: showText,
	});

	const containerStyle = useContainerAnimation({
		offsetTop: TOP_CONTENT_OFFSET,
	});

	const gesture = useDescriptionGestures();

	const showFlavor = investigator.flavor && (!gameText.show || showDescription);
	const showTraits = !gameText.show || showDescription;

	const textUnit = gameText.showSmallText ? vw * 0.9 : vw;

	return (
		<C.Container {...props} style={[props.style, containerStyle]}>
			<C.Content>
				{!showDescription && <C.ExpandArea />}
				<C.TopContent />
				<GestureDetector gesture={gesture}>
					<C.Background faction={faction} width={screen.width}>
						<C.DescriptionContent>
							<C.TextContent>
								{showTraits && (
									<C.Traits unit={vw} investigator={investigator} />
								)}
								<C.Description style={descriptionStyle} onLayout={onLayout}>
									<C.Text investigator={investigator} unit={textUnit} />
									{showFlavor && (
										<C.Flavor unit={vw} investigator={investigator} />
									)}
								</C.Description>
							</C.TextContent>
							<C.Menu />
						</C.DescriptionContent>
					</C.Background>
				</GestureDetector>
			</C.Content>
		</C.Container>
	);
};
