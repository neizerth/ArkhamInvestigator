import type { TextProps } from "react-native"
import type { ComponentStyleMap } from "../model"
import type { HTMLReactParserOptions } from "html-react-parser"
import { v4 } from "uuid"
import { Fragment, Key } from "react"
import { Icon } from "@shared/ui"
import { iconMapping } from "../config"
import * as C from "../ui/GameText/GameText.components"

type GetLibraryOptions = {
  componentStyles?: ComponentStyleMap
  props: TextProps
}
export const getLibrary = ({
  componentStyles,
  props
}: GetLibraryOptions): HTMLReactParserOptions['library'] => ({
  cloneElement(...args) {
    return <C.Text key={v4()}/>
  },
  createElement(type, elementProps, ...children) {
    const componentStyle = componentStyles?.[type];

    const mergedProps = {
      ...props,
      ...elementProps
    }

    const mergedStyles = [
      props.style,
      componentStyle
    ]

    const textStyle = [
      props.style,
      componentStyles?.text
    ]

    if (type === 'content') {
      return (
        <Fragment key={v4()}>
          {children}
        </Fragment>
      );
    }

    if (type === 'p') {
      const content = children
        .map(child => (
          <C.Text 
            {...props}
            style={textStyle}
            key={v4()}
          >
            {child}
          </C.Text>
        ))

      return (
        <C.Paragraph
          {...elementProps}
          key={v4()}
          style={[
            componentStyles?.paragraph
          ]}
        >
          {content}
        </C.Paragraph>
      )
    }

    if (type === 'icon') {
      if (!elementProps || !('icon' in elementProps) || typeof elementProps.icon !== 'string') {
        return <C.Text key={v4()}/>
      }
      const { icon } = elementProps;
      const value = iconMapping[icon] || icon;

      const content = children
        .map(child => (
          <C.Text 
            {...props}
            style={textStyle}
            key={v4()}
          >
            {child}
          </C.Text>
        ))

      return (
        <C.Line key={v4()}>
          <Icon
            {...mergedProps}
            key={v4()}
            icon={value}
            style={mergedStyles}
            scaleType={false}
          />
          {content}
        </C.Line>
      );
    }

    const content = children
      .map(child => (
        <C.Text 
          {...mergedProps}
          style={textStyle}
          key={v4()}
        >
          {child}
        </C.Text>
      ))

    return (
      <C.Text
        {...mergedProps}
        key={v4()}
        style={textStyle}
      >
        {content}
      </C.Text>
    )
  },
  isValidElement: () => true
})