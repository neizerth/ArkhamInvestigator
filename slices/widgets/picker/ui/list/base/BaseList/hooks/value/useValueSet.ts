import { getValueIndex } from "@widgets/picker/lib";
import { useCallback, useEffect, useRef } from "react";
import type { FlatList } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

export const useValueSet = (props: BaseListProps) => {
	const {
		data,
		onUserActivationChange: onUserActivationChangeProp,
		animatedInit,
		onContentSizeChange: onContentSizeChangeProp,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);

	const index = Math.min(getValueIndex(props), data.length - 1);

	const getAnimated = useCallback(() => {
		return animatedInit !== undefined ? animatedInit : !active.current;
	}, [animatedInit]);

	const scrollToIndex = useCallback(() => {
		ref.current?.scrollToIndex({
			index,
			animated: getAnimated(),
		});
	}, [getAnimated, index]);

	useEffect(() => {
		scrollToIndex();
	}, [scrollToIndex]);

	const onContentSizeChange = useCallback(
		(width: number, height: number) => {
			scrollToIndex();
			if (typeof onContentSizeChangeProp === "function") {
				onContentSizeChangeProp?.(width, height);
			}
		},
		[onContentSizeChangeProp, scrollToIndex],
	);

	const onUserActivationChange = useCallback(
		(Activate: boolean) => {
			active.current = Activate;
			if (typeof onUserActivationChangeProp === "function") {
				onUserActivationChangeProp(Activate);
			}
		},
		[onUserActivationChangeProp],
	);

	return {
		...props,
		ref,
		onUserActivationChange,
		onContentSizeChange,
	};
};
