import type { PropsWithBox } from "@shared/model/ui";
import type { FC } from "react";
import { View, Image, type ImageProps } from "react-native";
import styled, { css } from "styled-components/native";

export { View as Container };

type BackgroundProps = ImageProps & PropsWithBox;

export const Background: FC<BackgroundProps> = styled(Image)`
  ${({ box }: PropsWithBox) => css`
    width: ${box.width}px;
    height: ${box.height}px;
 `}
`