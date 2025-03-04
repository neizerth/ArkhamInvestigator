import React from "react";
import { StrokedIconNumber } from "./StrokedIconNumber";
import { UnstrokedIconNumber } from "./UnstrokedIconNumber";
import type { IconNumberProps } from "./IconNumber.types";
import { StyleSheet, ViewStyle } from "react-native";
import { font } from "@shared/config";

export type { IconNumberProps };

export const IconNumber = (props: IconNumberProps) => {
  const { stroke } = props;

  const Component = stroke ? 
    StrokedIconNumber : 
    UnstrokedIconNumber;

  const style = StyleSheet.flatten(props.style);
  const defaultFontSize = style.fontSize || font.size.default;

  const fontSize = defaultFontSize * font.scale;

  const containerStyle = {
    marginBlock: -fontSize * 0.4
  }

  return (
    <Component {...props}
      style={[
        props.style,
        containerStyle,
        { fontSize }
      ]}
    />
  )
}



