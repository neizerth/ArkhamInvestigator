import { useAppSelector } from "@shared/lib";
import type { ImageProps } from "expo-image";
import type { ComponentType, FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { selectArtworksEnabled } from "../../lib";

type Source = ImageProps["source"];

type PropsWithSource = {
	source?: Source;
	style?: StyleProp<ViewStyle>;
};

type WithThemeSourceProps<T extends PropsWithSource> = T & {
	source?: Source;
	fallbackSource?: Source;
};

export function withThemeSource<T extends PropsWithSource>(
	Component: ComponentType<T>,
	initialProps?: Partial<T>,
) {
	return (imageProps: Partial<WithThemeSourceProps<T>>) => {
		const EnchancedComponent: FC<WithThemeSourceProps<T>> = ({
			fallbackSource,
			...props
		}) => {
			const artworksEnabled = useAppSelector(selectArtworksEnabled);

			const fallback = fallbackSource || imageProps.fallbackSource;
			const src = props.source || imageProps.source;

			const source = artworksEnabled || !fallback ? src : fallback;

			return (
				<Component
					{...initialProps}
					{...(imageProps as T)}
					{...props}
					style={[initialProps?.style, imageProps.style, props.style]}
					source={source}
				/>
			);
		};

		const displayName =
			EnchancedComponent.displayName || EnchancedComponent.name;
		const name = Component.displayName || Component.name;
		EnchancedComponent.displayName = `withTheme${name}(${displayName})`;

		return EnchancedComponent;
	};
}
