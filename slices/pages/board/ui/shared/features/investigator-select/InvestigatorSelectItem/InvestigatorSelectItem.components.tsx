import { color, factionColor, font } from "@shared/config";
import { PropsWithFaction } from "@shared/model";
import { IconNumber } from "@shared/ui";
import { PickerMemo as BasePicker } from "@widgets/picker";
import { FC } from "react";
import { Image as BaseImage, ImageProps, View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

const size = 60;
const borderSize = 2;
const imageSize = size - borderSize * 2;

type ContainerProps = ViewProps & PropsWithFaction;

export const Container: FC<ContainerProps> = styled(View)`
  position: relative;
  width: ${size}px;
  height: ${size}px;
  border: ${borderSize}px solid black;
  border-radius: ${size}px;
  ${({ faction }: PropsWithFaction ) => css`
    border-color: ${factionColor[faction].border};
  `}
`

export const Overlay: typeof View = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: ${imageSize}px;
  height: ${imageSize}px;

  border-radius: ${imageSize}px;
  background-color: rgba(0, 0, 0, 0.4);
`

export const Id: typeof IconNumber = styled(IconNumber)`
  color: ${color.light10};
  font-size: ${font.size.large}px;
`

export const Image: typeof BaseImage = styled(BaseImage)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${imageSize}px;
  width: ${imageSize}px;
  height: ${imageSize}px;
`

