import { View } from 'react-native';
import { InvestigatorImage } from '../InvestigatorImage';
import styled from 'styled-components/native';

export { View as Container }

export const Background: typeof InvestigatorImage = styled(InvestigatorImage)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
` 