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
	useLayoutSize,
} from "@shared/lib";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import { LayoutContext } from "../../../../../../config";
import * as C from "./FooterDescription.components";
import { useContainerAnimation } from "./useContainerAnimation";

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({ ...props }: FooterDescriptionProps) => {
	const route = useRoute();
	const dispatch = useAppDispatch();
	const showDescription = useAppSelector(selectShowDescription);

	const { view } = useContext(LayoutContext);
	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);
	const [topContentSize, onTopContentLayout] = useLayoutSize();

	const onBack = useCallback(() => {
		const isBoard = route.name === "board/index";
		if (showDescription && isBoard) {
			dispatch(setShowDescription(false));
			return true;
		}
		return false;
	}, [dispatch, showDescription, route]);

	useBackButton(onBack);

	const offsetTop = topContentSize?.height || 0;

	const descriptionStyle = useFadeAnimation({
		show: showDescription,
	});

	const containerStyle = useContainerAnimation({
		offsetTop,
	});

	const expandStyle = {
		top: offsetTop,
	};

	const vw = (view.width * 6) / 100;

	if (!vw) {
		return null;
	}

	return (
		<C.Container {...props} style={[props.style, containerStyle]}>
			<C.Content>
				{!showDescription && (
					<C.ExpandArea
						actionCreator={setShowDescription}
						style={expandStyle}
					/>
				)}
				<C.TopContent show={showDescription} onLayout={onTopContentLayout} />
				<C.Background faction={faction} width={view.width}>
					<C.DescriptionContent>
						<C.TextContent>
							<C.Traits unit={vw} investigator={investigator} />
							<C.Description style={descriptionStyle}>
								<C.Text investigator={investigator} unit={vw} />
								{investigator.flavor && (
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
