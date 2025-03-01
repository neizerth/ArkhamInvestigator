import { factionColor } from "@shared/config";
import { PropsWithFaction } from "@shared/model";
import { FC } from "react";
import { Image as BaseImage, ImageProps, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`

export const Image: FC<ImageProps & PropsWithFaction> = styled(BaseImage)`
  border: 2px solid black;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  ${({ faction }: PropsWithFaction ) => css`
    border-color: ${factionColor[faction].border};
  `}
`