import type { PropsWithStyle } from "@shared/model";
import { type AppTextProps, UnscaledText } from "@shared/ui";
import { mergeDeepRight } from "ramda";
import type { ComponentType, FC } from "react";
import { StyleSheet, Text, type TextProps, TextStyle } from "react-native";
import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector";
import {
	type KeyConfig,
	getKeyConfig,
} from "../../../../shared/lib/util/record";
import { selectLanguage } from "../store/features/i18n/i18n";

type WithLocaleProps = PropsWithStyle & {
	language?: string;
};

export type WithLocaleFontOptions<Props extends WithLocaleProps> = {
	Component?: ComponentType<Props>;
	style?: KeyConfig<Props["style"]>;
	props?: Record<string, Partial<Props>> & {
		default?: Partial<Props>;
	};
};

export function withLocale<Props extends WithLocaleProps = AppTextProps>(
	options: WithLocaleFontOptions<Props>,
) {
	const { Component = UnscaledText } = options;

	const WithLocale: FC<Props> = (props) => {
		const defaultLanguage = useAppSelector(selectLanguage);
		const language = props.language || defaultLanguage;

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
			options.style || {},
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
