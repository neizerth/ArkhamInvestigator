import { statusBarHeight } from "@shared/config";
import {
	selectShowDescription,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { descriptionSize } from "../../../../../../../config";
import { useDescriptionHeight } from "../../../../../../../lib";

const screen = Dimensions.get("screen");

type Options = {
	offsetTop?: number;
};

const DELAY_OUT = 300;

export const useContainerAnimation = ({ offsetTop = 0 }: Options) => {
	const descriptionHeight = useDescriptionHeight();
	const showDescription = useAppSelector(selectShowDescription);
	const window = useWindowDimensions();

	const systemHeight = screen.height - window.height - statusBarHeight;

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return window.height - height - offsetTop + statusBarHeight;
	}, [offsetTop, window.height]);

	const [zIndex, setZIndex] = useState(-1);

	const fadeTimeout = useRef<NodeJS.Timeout>();

	useEffect(() => {
		clearTimeout(fadeTimeout.current);
		if (!showDescription) {
			fadeTimeout.current = setTimeout(() => {
				setZIndex(-1);
			}, DELAY_OUT);
			return;
		}
		setZIndex(5);
	}, [showDescription]);

	const positionStyle = {
		zIndex,
	};

	const minValue = screen.height - descriptionHeight - offsetTop - systemHeight;

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
