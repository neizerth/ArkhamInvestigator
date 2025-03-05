import { assetsSize } from "@pages/board/config";
import { PropsWithView } from "@pages/board/model";
import { size } from "@shared/config";
import { PropsWithUnit } from "@shared/model";
import { DefinedIconProps, Icon } from "@shared/ui";
import { FC } from "react";
import { View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & PropsWithUnit & {
  single: boolean
}

const isHistoryInColumn = (unit: number) => unit > 340;

export const Container: FC<ContainerProps> = styled(View)`
  gap: 35px;
  justify-content: flex-end;
  align-items: center;
  min-width: ${assetsSize.main}px;
  ${({ unit } : ContainerProps) => !isHistoryInColumn(unit) && css`
    align-items: flex-start;
    padding-bottom: 50px;
  `}
  ${({ single } : ContainerProps) => single && css`
    align-items: center;
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

    if (single || isHistoryInColumn(unit)) {
      return;
    }

    return css`
      flex-direction: row;
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