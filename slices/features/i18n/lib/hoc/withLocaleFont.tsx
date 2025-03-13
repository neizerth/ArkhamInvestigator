import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector"
import { getKeyConfig } from "../../../../shared/lib/util/record"
import type { ComponentType, FC } from "react"
import { StyleSheet, Text, type TextProps } from "react-native"
import { selectLanguage } from "../store/features/i18n/i18n"

export type WithLocaleFontOptions<Props extends TextProps> = {
  Component?: ComponentType<Props>
  style: Record<string, Props['style']> & {
    default: Props['style']
  }
  fontScale?: Record<string, number>
}

export const withLocaleFont = <Props extends TextProps>(
  options: WithLocaleFontOptions<Props>
) => {
  const { Component = Text } = options;

  const getStyle = getKeyConfig(options.style);

  const LocaleText: FC<Props> = props => {
    const language = useAppSelector(selectLanguage);
    const style = getStyle(language)

    const styleSheet = StyleSheet.flatten(props.style);

    const scaleStyle = styleSheet.fontSize && options.fontScale?.[language] && {
      fontSize: styleSheet.fontSize * options.fontScale[language]
    }

    return (
      <Component 
        {...props}
        style={[
          props.style,
          style,
          scaleStyle
        ]}
      />
    )
  }

  const displayName = 'displayName' in Component ? Component.displayName : Component.name;
  LocaleText.displayName = `WithLocaleFont(${displayName})`

  return LocaleText;
}