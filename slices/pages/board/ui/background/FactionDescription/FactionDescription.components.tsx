import { descriptionSize } from "@pages/board/config";
import type { PropsWithFaction } from "@shared/model";
import type { FC } from "react";
import { ImageBackground, ScrollView, type ImageBackgroundProps } from "react-native";
import styled, { css } from "styled-components/native";
import { getFactionStyle } from "./FactionDescription.styles";
import { getBoxByRatio } from "@shared/lib/util/size/box";

export type BackgroundProps = ImageBackgroundProps & PropsWithFaction;

export const Background: FC<BackgroundProps> = styled(ImageBackground)`
  padding-top: 10%;
  ${({ width, height, faction }: BackgroundProps) => {
    if (!width && !height) {
      return;
    }
    const box = {
      width, 
      height
    }

    const imageBox = getBoxByRatio({
      ratio: descriptionSize.ratio,
      box
    })

    if (!imageBox) {
      return;
    }
    
    return css`
      width: ${imageBox.width}px;
      height: ${imageBox.width / descriptionSize.ratio}px;
      ${getFactionStyle(faction)}
    `
  }}
`

export const Content: typeof ScrollView = styled(ScrollView)`
  
`