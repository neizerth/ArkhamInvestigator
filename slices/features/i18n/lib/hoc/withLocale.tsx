import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector"
import { getKeyConfig, KeyConfig } from "../../../../shared/lib/util/record"
import type { ComponentType, FC } from "react"
import { StyleSheet, Text, TextStyle, type TextProps } from "react-native"
import { selectLanguage } from "../store/features/i18n/i18n"
import type { PropsWithStyle } from "@shared/model"
import { mergeDeepRight } from "ramda"

type WithLocaleProps = PropsWithStyle & {
  language?: string
}

export type WithLocaleFontOptions<Props extends WithLocaleProps> = {
  Component?: ComponentType<Props>
  style?: KeyConfig<Props['style']>
  props?: Record<string, Partial<Props>> & {
    default?: Partial<Props>
  }
}

export function withLocale<Props extends WithLocaleProps = TextProps> (
  options: WithLocaleFontOptions<Props>
) {
  const { Component = Text } = options;


  const WithLocale: FC<Props> = props => {
    const defaultLanguage = useAppSelector(selectLanguage);
    const language = props.language || defaultLanguage;
    
    const defaultPropsConfig = mergeDeepRight(
      props,
      options?.props?.default || {}
    )

    const propsConfig = mergeDeepRight(
      {
        default: defaultPropsConfig,
      },
      options.props || {},
    ) as KeyConfig<Partial<Props>>

    const styleConfig = mergeDeepRight(
      {
        default: props.style || {},
      },
      options.style || {}
    )

    const getStyle = getKeyConfig(styleConfig);
    const localeStyle = getStyle(language)

    const getLocaleProps = getKeyConfig(propsConfig);
    const localeProps = getLocaleProps(language) as Props

    return (
      <Component 
        {...props}
        {...localeProps}
        style={[
          props.style,
          localeStyle
        ]}
      />
    )
  }

  const displayName = 'displayName' in Component ? Component.displayName : Component.name;
  WithLocale.displayName = `WithLocale(${displayName})`

  return WithLocale;
}