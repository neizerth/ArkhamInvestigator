import { size } from '@shared/config';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: ${size.gap.medium}px ${size.gap.default}px;
  gap: ${size.gap.default}px;
`