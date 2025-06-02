import { forwardRef, useCallback, useRef, useState } from "react";
import type {
	FlatListProps as BaseListProps,
	LayoutChangeEvent,
	ScrollViewProps,
	ViewProps,
} from "react-native";
import type { FlatList as BaseList } from "react-native-gesture-handler";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useLayoutSize } from "../../../../lib/hooks/ui/useLayoutSize";
import * as C from "./FlatList.components";

export type FlatListProps<T> = BaseListProps<T> & {
	containerStyle?: ViewProps["style"];
	contentStyle?: ViewProps["style"];
	scrollBarStyle?: ViewProps["style"];
};

type ScrollCallback = Exclude<ScrollViewProps["onScroll"], undefined>;

// biome-ignore lint/suspicious/noExplicitAny: forwarding refs doesn't allow generics
export const FlatList = forwardRef<BaseList, FlatListProps<any>>(
	function FlatList(
		{
			containerStyle,
			contentStyle,
			onLayout: onLayoutProp,
			onContentSizeChange: onContentSizeChangeProp,
			onScroll: onScrollProp,
			...props
		},
		ref,
	) {
		const [contentHeight, setContentHeight] = useState(0);
		const [layout, onLayoutSize] = useLayoutSize();

		const offset = useSharedValue(0);
		const opacity = useSharedValue(0);

		const layoutHeight = layout?.height || 0;

		const showIndicator = contentHeight > layoutHeight;

		const scale = layoutHeight / contentHeight;

		const indicatorHeight = Math.round(layoutHeight * scale);

		const onLayout = useCallback(
			(e: LayoutChangeEvent) => {
				onLayoutProp?.(e);
				onLayoutSize(e);
			},
			[onLayoutProp, onLayoutSize],
		);

		const onContentSizeChange = useCallback(
			(width: number, height: number) => {
				onContentSizeChangeProp?.(width, height);
				setContentHeight(height);
			},
			[onContentSizeChangeProp],
		);

		const opacityTimeout = useRef<NodeJS.Timeout>();

		const onScroll: ScrollCallback = useCallback(
			(e) => {
				clearTimeout(opacityTimeout.current);
				opacity.value = 1;
				onScrollProp?.(e);
				const { y } = e.nativeEvent.contentOffset;
				offset.value = Math.round(y * scale);

				opacityTimeout.current = setTimeout(() => {
					opacity.value = 0;
				}, 1000);
			},
			[onScrollProp, offset, opacity, scale],
		);

		const indicatorStyle = {
			height: indicatorHeight,
		};

		const indicatorAnimatedStyle = useAnimatedStyle(() => {
			const translateY = withTiming(offset.value, {
				duration: 16,
			});

			return {
				opacity: withTiming(opacity.value),
				transform: [
					{
						translateY,
					},
				],
			};
		});

		return (
			<C.Container style={containerStyle}>
				<C.Content>
					<C.List
						ref={ref}
						// showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						{...props}
						onScroll={onScroll}
						onLayout={onLayout}
						onContentSizeChange={onContentSizeChange}
					/>
					<C.ScrollBar>
						{showIndicator && (
							<C.ScrollBarIndicator
								style={[indicatorStyle, indicatorAnimatedStyle]}
							/>
						)}
					</C.ScrollBar>
				</C.Content>
			</C.Container>
		);
	},
);
