import type { TextProps } from "react-native"
import type { ComponentStyleMap } from "../model"
import type { HTMLReactParserOptions } from "html-react-parser"
import { v4 } from "uuid"
import { Key } from "react"
import { Icon } from "@shared/ui"
import { iconMapping } from "../config"
import { Line, Text } from "../ui/GameText/GameText.components"

type GetLibraryOptions = {
  componentStyles?: ComponentStyleMap
  props: TextProps
}
export const getLibrary = ({
  componentStyles,
  props
}: GetLibraryOptions): HTMLReactParserOptions['library'] => ({
  cloneElement(...args) {
    return <Text key={v4()}/>
  },
  createElement(type, elementProps, ...children) {
    const componentStyle = componentStyles && componentStyles[type];

    const mergedProps = {
      ...props,
      ...elementProps
    }

    const mergedStyles = [
      props.style,
      componentStyle
    ]

    if (type === 'icon') {
      if (!elementProps || !('icon' in elementProps) || typeof elementProps.icon !== 'string') {
        return <Text key={v4()}/>
      }
      const { icon } = elementProps;
      const value = iconMapping[icon] || icon;

      const content = children
        .map(child => (
          <Text 
            {...mergedProps}
            style={props.style}
            key={v4()}
          >
            {child}
          </Text>
        ))

      return (
        <Line key={v4()}>
          <Icon
            {...mergedProps}
            key={v4()}
            icon={value}
            style={mergedStyles}
          />
          {content}
        </Line>
      );
    }

    const content = children
      .map(child => (
        <Text 
          {...mergedProps}
          style={mergedStyles}
          key={v4()}
        >
          {child}
        </Text>
      ))

    return (
      <Text
        {...mergedProps}
        key={v4()}
        style={mergedStyles}
      >
        {content}
      </Text>
    )
  },
  isValidElement: () => true
})