import type { PropsWithBox, PropsWithFaction } from "@shared/model";
import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { getFactionStyle } from "./InvestigatorDescription.styles";

export type BackgroundProps = ImageBackgroundProps & PropsWithBox;

export const Background: FC<BackgroundProps> = styled(ImageBackground)`
  
  ${({ box }: BackgroundProps) => {
		return css`
      width: ${box.width}px;
      height: ${box.height}px;
    `;
	}}
`;

type ContentProps = ViewProps & PropsWithBox & PropsWithFaction;

export const Content: FC<ContentProps> = styled(View)`
  padding-top: 10%;
  ${({ box, faction }: ContentProps) => {
		return css`
      width: ${box.width}px;
      height: ${box.height}px;
      ${getFactionStyle(faction)}
    `;
	}}
 
`;
