import { assetsSize } from "@pages/board/config";
import { PropsWithView } from "@pages/board/model";
import { size } from "@shared/config";
import { PropsWithUnit } from "@shared/model";
import { DefinedIconProps, Icon } from "@shared/ui";
import { FC } from "react";
import { View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
  single: boolean
}

export const Container: FC<ContainerProps> = styled(View)`
  gap: 35px;
  justify-content: flex-end;
  min-width: ${assetsSize.main}px;
  ${({ single } : ContainerProps) => single && css`
    padding-bottom: 50px;
  `}
`

type HistoryProps = ContainerProps & PropsWithUnit;

export const History: FC<HistoryProps> = styled(View)`
  gap: 35px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${({ single, unit }: HistoryProps) => {

    if (single || unit > 340) {
      return;
    }

    return css`
      flex-direction: row;
      padding-left: ${size.gap.medium};
    `
  }}
`

export const Undo: FC<DefinedIconProps> = styled(Icon)
  .attrs({
    icon: 'undo'
  })`
    font-size: 30px;
    color: white;
  `

export const Redo: FC<DefinedIconProps> = styled(Icon)
  .attrs({
    icon: 'redo'
  })`
    font-size: 30px;
    color: white;
  `