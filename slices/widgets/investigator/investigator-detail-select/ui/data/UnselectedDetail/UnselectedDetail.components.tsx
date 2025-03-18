import { color } from "@shared/config";
import { UnscaledText, Icon as BaseIcon } from "@shared/ui";
import type { FC } from "react";
import { TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from 'react-native'
import styled, { css } from "styled-components/native";

export type WithSelected = {
  selected: boolean;
}

export type ContainerElement = FC<TouchableOpacityProps & WithSelected>;

export const Container: ContainerElement = styled(TouchableOpacity)`
  width: 75px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.dark15};
  ${({ selected }: WithSelected) => selected && css`
    border-width: 5px;
  `}
  
`

export const Text: typeof UnscaledText = styled(UnscaledText)`
  font-size: 24px;
  color: ${color.dark10}
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 32px;
  color: ${color.dark20};
`