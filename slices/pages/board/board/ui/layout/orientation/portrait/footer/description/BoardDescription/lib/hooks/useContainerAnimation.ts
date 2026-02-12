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

const DURATION = 300;

export const useContainerAnimation = ({
	offsetTop = 0,
	onHide,
	onShow,
}: Options) => {
	const dispatch = useAppDispatch();

	const descriptionHeight = useAppSelector(selectDescriptionHeight("current"));
	const showDescription = useAppSelector(selectShowDescription);
	const window = useWindowDimensions();

	const systemHeight = Math.max(
		screen.height - window.height - statusBarHeight,
		0,
	);

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return window.height - height - offsetTop + systemHeight;
	}, [offsetTop, window.height, systemHeight]);

	const [zIndex, setZIndex] = useState(-1);

	const showDescriptionRef = useRef(showDescription);

	useEffect(() => {
		showDescriptionRef.current = showDescription;
		if (showDescription) {
			setZIndex(5);
		}
	}, [showDescription]);

	const onComplete = useCallback(() => {
		if (showDescriptionRef.current) {
			onShow?.();
			dispatch(descriptionShown());
		} else {
			setZIndex(-1);
			onHide?.();
			dispatch(descriptionHidden());
		}

		dispatch(setDescriptionTransition(false));
	}, [dispatch, onShow, onHide]);

	const onStart = useCallback(() => {
		dispatch(setDescriptionTransition(true));
	}, [dispatch]);

	const positionStyle = {
		zIndex,
	};

	const minValue = screen.height - descriptionHeight - offsetTop - systemHeight;

	const animatedStyle = useBooleanAnimation({
		enabled: showDescription,
		duration: DURATION,
		minValue,
		maxValue,
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
