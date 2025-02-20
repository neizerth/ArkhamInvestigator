import { Text, TextProps } from "react-native"
import { ComponentStyleMap } from "../model"
import { HTMLReactParserOptions } from "html-react-parser"
import { v4 } from "uuid"
import { Key } from "react"
import { Icon } from "@shared/ui"
import { iconMapping } from "../config"

type GetLibraryOptions = {
  componentStyles?: ComponentStyleMap
  props: TextProps
}
export const getLibrary = ({
  componentStyles,
  props
}: GetLibraryOptions): HTMLReactParserOptions['library'] => ({
  cloneElement(...args) {

    console.log(...args)
    return <Text/>
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

    if (type === 'icon') {
      if (!elementProps || !('icon' in elementProps) || typeof elementProps.icon !== 'string') {
        return <Text key={key}/>
      }
      const { icon } = elementProps;
      const value = iconMapping[icon] || icon;

      return (
        <Text key={v4()}>
          <Icon
            {...mergedProps}
            key={v4()}
            icon={value}
            style={mergedStyles}
          />
          {content}
        </Text>
      );
    }

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