import { selectDescriptionTextSize } from "@modules/board/base/entities/description/lib";
import {
	selectAlwaysShowGameText,
	selectCurrentBoardProp,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import { useAppSelector, useFadeAnimation } from "@shared/lib";
import { Dimensions, type ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import {
	TOP_CONTENT_OFFSET,
	DESCRIPTION_TEXT_UNIT_SIZE as vw,
} from "../../../../../../../../config";
import {
	useContainerAnimation,
	useDescriptionBackButton,
	useDescriptionGestures,
} from "../lib";
import * as C from "./BoardDescription.components";

const screen = Dimensions.get("screen");

export type BoardDescriptionProps = ViewProps;
export const BoardDescription = ({ ...props }: BoardDescriptionProps) => {
	const alwaysShowText = useAppSelector(selectAlwaysShowGameText);

	const show = alwaysShowText && CAN_ALWAYS_SHOW_GAME_TEXT;

	const showDescription = useAppSelector(selectShowDescription);
	const textUnit = useAppSelector(
		selectDescriptionTextSize({
			boardId: "current",
			unit: vw,
		}),
	);

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	useDescriptionBackButton();

	const showText = showDescription || show;

	const descriptionStyle = useFadeAnimation({
		show: showText,
	});

	const containerStyle = useContainerAnimation({
		offsetTop: TOP_CONTENT_OFFSET,
	});

	const gesture = useDescriptionGestures();

	const showFlavor = investigator.flavor && (!show || showDescription);
	const unit = showDescription ? vw : textUnit;

	const showTraits = !show || showDescription;
	const compactTraits = !show && !showDescription;

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
									<C.Traits
										unit={vw}
										investigator={investigator}
										compact={compactTraits}
									/>
								)}
								<C.Description style={descriptionStyle}>
									<C.Text investigator={investigator} unit={unit} />
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
