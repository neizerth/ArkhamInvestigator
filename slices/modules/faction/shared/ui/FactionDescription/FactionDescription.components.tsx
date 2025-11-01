import { ThemeFactionDescriptionBackground } from "@modules/core/theme/shared/ui/faction/ThemeFactionDescriptionBackground";
import type { PropsWithBox, PropsWithFaction } from "@shared/model";
import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import type { FactionBackgroundProps } from "../FactionBackground";
import { getFactionDescriptionStyle } from "./FactionDescription.styles";

export type BackgroundProps = FactionBackgroundProps & PropsWithBox;

export const Background: FC<BackgroundProps> = styled(
	ThemeFactionDescriptionBackground,
)`
  
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
      ${getFactionDescriptionStyle(faction)}
    `;
	}}
 
`;
