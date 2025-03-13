import { getKeyConfig } from "../../../../shared/lib/util/record"
import type { ComponentType, FC } from "react"
import { Text, type TextProps } from "react-native"

export type WithLocaleFontOptions<Props extends TextProps> = {
  Component?: ComponentType<Props>
  style: Record<string, Props['style']> & {
    default: Props['style']
  }
}

export const withLocaleFont = <Props extends TextProps>(
  options: WithLocaleFontOptions<Props>
) => {
  const { Component = Text } = options;

  const getStyle = getKeyConfig(options.style); 

  const LocaleText: FC<Props> = props => {
    const language = 'default';
    const style = getStyle(language)

    return (
      <Component 
        {...props}
        style={[
          props.style,
          style
        ]}
      />
    )
  }

  const displayName = 'displayName' in Component ? Component.displayName : Component.name;
  LocaleText.displayName = `WithLocaleFont(${displayName})`

  return LocaleText;
}