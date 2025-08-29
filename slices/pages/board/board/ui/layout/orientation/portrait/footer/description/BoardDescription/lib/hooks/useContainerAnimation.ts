import {
	descriptionHidden,
	descriptionShown,
	selectDescriptionHeight,
} from "@modules/board/base/entities/description/lib";
import {
	selectShowDescription,
	setDescriptionTransition,
} from "@modules/board/base/shared/lib";
import { statusBarHeight } from "@shared/config";
import {
	useAppDispatch,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { descriptionSize } from "../../../../../../../../../config";

const screen = Dimensions.get("screen");

type Options = {
	offsetTop?: number;
	onShow?: () => void;
	onHide?: () => void;
};

const DELAY_OUT = 300;

export const useContainerAnimation = ({
	offsetTop = 0,
	onHide,
	onShow,
}: Options) => {
	const dispatch = useAppDispatch();

	const descriptionHeight = useAppSelector(selectDescriptionHeight("current"));
	const showDescription = useAppSelector(selectShowDescription);
	const window = useWindowDimensions();

	const systemHeight = screen.height - window.height - statusBarHeight;

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return window.height - height - offsetTop + statusBarHeight;
	}, [offsetTop, window.height]);

	const [zIndex, setZIndex] = useState(-1);

	const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (fadeTimeout.current) {
			clearTimeout(fadeTimeout.current);
		}
		if (!showDescription) {
			fadeTimeout.current = setTimeout(() => {
				setZIndex(-1);
			}, DELAY_OUT);
			return;
		}
		setZIndex(5);
	}, [showDescription]);

	const onComplete = useCallback(() => {
		if (showDescription) {
			onShow?.();
			dispatch(descriptionShown());
		} else {
			onHide?.();
			dispatch(descriptionHidden());
		}

		dispatch(setDescriptionTransition(false));
	}, [showDescription, dispatch, onShow, onHide]);

	const onStart = useCallback(() => {
		dispatch(setDescriptionTransition(true));
	}, [dispatch]);

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
		onStart,
		onComplete,
	});

	return [animatedStyle, positionStyle];
};
