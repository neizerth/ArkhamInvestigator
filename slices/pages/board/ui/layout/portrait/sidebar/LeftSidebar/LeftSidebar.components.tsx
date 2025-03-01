import { DefinedIconProps, Icon } from "@shared/ui";
import { FC } from "react";
import { View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
  single: boolean
}

export const Container: FC<ContainerProps> = styled(View)`
  gap: 35px;
  align-items: center;
  justify-content: end;
  ${({ single } : ContainerProps) => single && css`
    padding-bottom: 50px;
  `}
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