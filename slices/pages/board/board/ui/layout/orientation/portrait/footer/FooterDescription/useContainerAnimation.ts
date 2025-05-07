import {
	delay,
	selectShowDescription,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import { Dimensions } from "react-native";
import {
	PORTRAIT_DESCRIPTION_HEIGHT,
	descriptionSize,
} from "../../../../../../config";

const screen = Dimensions.get("screen");

type Options = {
	offsetTop?: number;
};

const DELAY_OUT = 300;

export const useContainerAnimation = ({ offsetTop = 0 }: Options) => {
	const showDescription = useAppSelector(selectShowDescription);

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return screen.height - height - offsetTop;
	}, [offsetTop]);

	const [zIndex, setZIndex] = useState(-1);

	useEffect(() => {
		if (!showDescription) {
			delay(DELAY_OUT).then(() => {
				setZIndex(-1);
			});
			return;
		}
		setZIndex(5);
	}, [showDescription]);

	const positionStyle = {
		zIndex,
	};

	const minValue = screen.height - PORTRAIT_DESCRIPTION_HEIGHT - offsetTop;

	const animatedStyle = useBooleanAnimation({
		enabled: showDescription,
		duration: 100,
		minValue,
		maxValue,
		delayIn: 100,
		delayOut: DELAY_OUT,
		styleResolver(top) {
			"worklet";
			return {
				top,
			};
		},
	});

	return [animatedStyle, positionStyle];
};
