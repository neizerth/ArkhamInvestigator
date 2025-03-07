import { View } from 'react-native';
import { InvestigatorImage } from '../layout/InvestigatorImage';
import styled, { css } from 'styled-components/native';
import { BoardHeader, type BoardHeaderProps } from '../layout';
import { servicePadding } from '@pages/board/config';
import type { FC } from 'react';
import { PortraitLayout as BasePortraitLayout, type PortraitLayoutProps as BasePortraitLayoutProps } from '../layout';
import type { PropsWithLayout } from '@pages/board/model';
import { color } from '@shared/config';

export const Container: typeof View = styled(View)`
  flex: 1;
  position: relative;
  background-color: ${color.dark30};
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

type HeaderProps = BoardHeaderProps & PropsWithLayout & {
  descriptionShown: boolean
};

export const Header: FC<HeaderProps> = styled(BoardHeader)`
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  ${({ descriptionShown }: HeaderProps) => css`
    z-index: ${descriptionShown ? 2 : 3};
  `}
  ${({ layout }: HeaderProps) => css`
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
