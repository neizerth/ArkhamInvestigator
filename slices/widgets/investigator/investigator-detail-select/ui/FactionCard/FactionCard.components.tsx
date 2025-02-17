import { color, factionColor } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";

import styled, { css } from "styled-components/native";
import type { PropsWithFaction } from "@shared/model/ui";
import { FactionBackground } from "../FactionBackground";

type F = typeof FactionBackground;

export const Background: typeof FactionBackground = styled(FactionBackground)`
  position: absolute;
  z-index: 1;
  width: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.15;
` 

export type ContainerElement = FC<ViewProps & PropsWithFaction>

export const Container: ContainerElement = styled(View)`
  ${({ faction }: PropsWithFaction) => css`
    background-color: ${factionColor[faction].darkBackground};
  `}
  overflow: hidden;
  position: relative;
  border-radius: 6px 6px 0px 0px;
`

export const Header: typeof View = styled(View)`
  position: relative;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 48px;
`

export const Body: typeof View = styled(View)`
  flex: 1;
  background-color: ${color.dark30};
`