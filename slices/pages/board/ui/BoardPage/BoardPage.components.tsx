import { View } from 'react-native';
import { InvestigatorImage } from '../background/InvestigatorImage';
import styled from 'styled-components/native';
import { BoardHeader } from '../header';

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

export const Header: typeof BoardHeader = styled(BoardHeader)`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
` 