import { View } from 'react-native';
import { InvestigatorImage } from '../background';
import styled, { css } from 'styled-components/native';
import { BoardHeader, type BoardHeaderProps } from '../header';
import { SERVICE_PADDING } from '@pages/board/config';
import type { FC } from 'react';

export const Container: typeof View = styled(View)`
  overflow: hidden;
`

export const Background: typeof InvestigatorImage = styled(InvestigatorImage)`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
` 

export const Header: FC<BoardHeaderProps> = styled(BoardHeader)`
  position: fixed;
  z-index: 2;
  left: 0;
  ${({ layout }: BoardHeaderProps) => css`
    top: ${layout.type === 'column' ? SERVICE_PADDING : 0}px;
  `}
` 