import { descriptionSize } from "@pages/board/config";
import type { PropsWithBox, PropsWithFaction } from "@shared/model";
import type { FC } from "react";
import { ImageBackground, ScrollView, View, type ImageBackgroundProps } from "react-native";
import styled, { css } from "styled-components/native";
import { getFactionStyle } from "./FactionDescription.styles";
import { getBoxByRatio } from "@shared/lib/util/size/box";
import { ViewProps } from "react-native";

export type BackgroundProps = ImageBackgroundProps & PropsWithBox;

export const Background: FC<BackgroundProps> = styled(ImageBackground)`
  
  ${({ box }: BackgroundProps) => {    
    return css`
      width: ${box.width}px;
      height: ${box.height}px;
    `
  }}
`

type ContentProps = ViewProps & PropsWithBox & PropsWithFaction;

export const Content: FC<ContentProps> = styled(View)`
  padding-top: 10%;
  ${({ box, faction }: ContentProps) => {    
    return css`
      width: ${box.width}px;
      height: ${box.height}px;
      ${getFactionStyle(faction)}
    `
  }}
 
`