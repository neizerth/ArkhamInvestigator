import type { ViewProps, TextProps } from "react-native";
import type { IconProps } from "../Icon/Icon";

export type IconNumberComponentProps = TextProps & {
  value: number
  strokeStyle?: TextProps['style'] 
  containerStyle?: ViewProps['style']
}

export type IconNumberProps = IconNumberComponentProps & {
  stroke?: boolean
}

export type CharType = '+' | '-' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type PropsWithSize = {
  size: number
}

export type PropsWithStroke = {
  stroke?: boolean
}


export type CharProps = IconProps & PropsWithSize;