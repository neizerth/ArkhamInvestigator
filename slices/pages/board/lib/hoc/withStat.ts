import { assetsSize } from "@pages/board/config";
import type { FC } from "react";
import styled from "styled-components/native";

export type WithStatOptions = {
  height?: number
  ratio: number
}
export const withStat = <T>(Component: FC<T>, options: WithStatOptions) => {
  const { 
    height = assetsSize.main, 
    ratio 
  } = options;
  const ExtendedComponent: typeof Component = styled(Component)`
    height: ${height}px;
    width: ${height * ratio}px;
  `

  const displayName = ExtendedComponent.displayName || ExtendedComponent.name;
  ExtendedComponent.displayName = `WithStat(${displayName})`

  return ExtendedComponent;
}