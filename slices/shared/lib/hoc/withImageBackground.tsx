import type { FC } from "react";
import { ImageBackground, type ImageBackgroundProps } from "react-native";
import styled from "styled-components/native";

export type WithBackgroundComponentProps = ImageBackgroundProps;

export const withImageBackground = (props: ImageBackgroundProps = {}) => {
  const Component: FC<ImageBackgroundProps> = styled(ImageBackground)
    .attrs(props)`
      justify-content: center;
      align-items: center;
    `

  const displayName = Component.displayName || Component.name;
  Component.displayName = `WithImageBackground(${displayName})`

  return Component;
}