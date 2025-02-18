import { color } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import type { FC } from "react";
import { Text as BaseText, TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from 'react-native'
import styled, { css } from "styled-components/native";

export type WithSelected = {
  selected: boolean;
}

export type ContainerElement = FC<TouchableOpacityProps & WithSelected>;

export const Container: ContainerElement = styled(TouchableOpacity)`
  width: 75px;
  aspect-ratio: 1;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  ${({ selected }: WithSelected) => css`
    border: 1px solid ${selected ? color.dark10 : color.dark10}
  `}
  
`

export const Text: typeof BaseText = styled(BaseText)`
  font-size: 24px;
  color: ${color.dark10}
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 32px;
  color: ${color.dark10};
`