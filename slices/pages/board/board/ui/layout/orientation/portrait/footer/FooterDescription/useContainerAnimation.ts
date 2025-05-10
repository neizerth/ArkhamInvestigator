import { statusBarHeight } from "@shared/config";
import {
	delay,
	selectShowDescription,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";
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
	const window = useWindowDimensions();

	const systemHeight = screen.height - window.height - statusBarHeight;

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return window.height - height - offsetTop + statusBarHeight;
	}, [offsetTop, window.height]);

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

	const minValue =
		screen.height - PORTRAIT_DESCRIPTION_HEIGHT - offsetTop - systemHeight;

	const animatedStyle = useBooleanAnimation({
		enabled: showDescription,
		duration: 100,
		minValue,
		maxValue,
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
