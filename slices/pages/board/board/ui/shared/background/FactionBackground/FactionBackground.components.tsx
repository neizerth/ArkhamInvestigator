import type { FC } from "react";
import { Dimensions, Image, type ImageProps } from "react-native";
import styled from "styled-components/native";

const screen = Dimensions.get("screen");

type BackgroundProps = ImageProps;

export const Background: FC<BackgroundProps> = styled(Image)`
  width: ${screen.width}px;
  height: ${screen.height}px;
`;
