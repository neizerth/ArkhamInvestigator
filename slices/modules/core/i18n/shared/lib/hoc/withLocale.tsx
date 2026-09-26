import { type KeyConfig, getKeyConfig } from "@shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithStyle } from "@shared/model";
import { UnscaledText, type UnscaledTextProps } from "@shared/ui";
import { mergeDeepRight } from "ramda";
import type { ComponentType, FC } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { type DefaultTheme, useTheme } from "styled-components/native";
import { selectCurrentLanguage } from "../store";

type WithLocaleProps = PropsWithStyle & {
	language?: string;
};

type LocaleStyle<T> = Extract<
	NonNullable<T>,
	TextStyle | ViewStyle | ImageStyle
>;

type LocaleStyleMap<Props extends WithLocaleProps> = KeyConfig<
	LocaleStyle<Props["style"]>
>;

export type WithLocaleFontOptions<
	Props extends WithLocaleProps,
	Style extends LocaleStyleMap<Props> = LocaleStyleMap<Props>,
> = {
	Component?: ComponentType<Props>;
	style?: ((theme: DefaultTheme) => Style) | KeyConfig<Props["style"]>;
	props?: Record<string, Partial<Props>> & {
		default?: Partial<Props>;
	};
};

export function withLocale<
	Props extends WithLocaleProps = UnscaledTextProps,
	const Style extends LocaleStyleMap<Props> = LocaleStyleMap<Props>,
>(options: WithLocaleFontOptions<Props, Style>) {
	const { Component = UnscaledText } = options;

	const WithLocale: FC<Props> = (props) => {
		const theme = useTheme();
		const defaultLanguage = useAppSelector(selectCurrentLanguage);
		const language = props.language || defaultLanguage;
		const styleOption =
			typeof options.style === "function"
				? options.style(theme)
				: options.style;

		const defaultPropsConfig = mergeDeepRight(
			props,
			options?.props?.default || {},
		);

		const propsConfig = mergeDeepRight(
			{
				default: defaultPropsConfig,
			},
			options.props || {},
		) as KeyConfig<Partial<Props>>;

		const styleConfig = mergeDeepRight(
			{
				default: props.style || {},
			},
			styleOption || {},
		);

		const getStyle = getKeyConfig(styleConfig);
		const localeStyle = getStyle(language);

		const getLocaleProps = getKeyConfig(propsConfig);
		const localeProps = getLocaleProps(language) as Props;

		return (
			<Component
				{...props}
				{...localeProps}
				style={[props.style, localeStyle]}
			/>
		);
	};

	const displayName =
		"displayName" in Component ? Component.displayName : Component.name;
	WithLocale.displayName = `WithLocale(${displayName})`;

	return WithLocale;
}
