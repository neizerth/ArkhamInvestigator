import { View } from 'react-native';
import { InvestigatorImage } from '../background';
import styled, { css } from 'styled-components/native';
import { BoardHeader, type BoardHeaderProps } from '../header';
import { servicePadding } from '@pages/board/config';
import type { FC } from 'react';
import { PortraitLayout as BasePortraitLayout, type PortraitLayoutProps as BasePortraitLayoutProps } from '../layout/portrait';
import type { PropsWithLayout } from '@pages/board/model';
import { size } from '@shared/config';
import { PropsWithUnit } from '@shared/model';

export const Container: typeof View = styled(View)`
  flex: 1;
  position: relative;
`

export const Background: typeof InvestigatorImage = styled(InvestigatorImage)`
  position: absolute;
  flex: 1;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
` 

export const Header: FC<BoardHeaderProps & PropsWithLayout> = styled(BoardHeader)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ layout }: PropsWithLayout) => css`
    top: ${servicePadding[layout.type].top}px;
  `}
` 

export const PortraitLayout: FC<BasePortraitLayoutProps> = styled(BasePortraitLayout)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`
