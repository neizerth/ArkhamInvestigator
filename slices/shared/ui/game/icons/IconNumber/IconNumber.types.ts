import type { ViewProps, TextProps } from "react-native";
import type { IconProps } from "../Icon/Icon";

export type IconNumberComponentProps = TextProps & {
  value: number | string
  strokeStyle?: TextProps['style'] 
  containerStyle?: ViewProps
}

export type IconNumberProps = IconNumberComponentProps & {
  stroke?: boolean
}

export type PropsWithSize = {
  size: number
}

export type PropsWithStroke = {
  stroke?: boolean
}


export type CharProps = IconProps & PropsWithSize;