import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription, FactionDescriptionProps } from "../../background";
import { FC } from "react";
import { PropsWithView } from "@pages/board/model";
import { descriptionSize } from "@pages/board/config";

export const Container: typeof View = styled(View)`
  position: relative;
`

type BackgroundProps = FactionDescriptionProps & PropsWithView;

export const Background: FC<BackgroundProps> = styled(FactionDescription)`
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  ${({ view }: PropsWithView) => css`
    width: ${view.width}px;
    height: ${view.width / descriptionSize.ratio}px;
  `}
`