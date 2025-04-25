import { type KeyConfig, getKeyConfig } from "@shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithStyle } from "@shared/model";
import { UnscaledText, type UnscaledTextProps } from "@shared/ui";
import { mergeDeepRight } from "ramda";
import type { ComponentType, FC } from "react";
import { selectCurrentLanguage } from "../store";

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

export function withLocale<Props extends WithLocaleProps = UnscaledTextProps>(
	options: WithLocaleFontOptions<Props>,
) {
	const { Component = UnscaledText } = options;

	const WithLocale: FC<Props> = (props) => {
		const defaultLanguage = useAppSelector(selectCurrentLanguage);
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
