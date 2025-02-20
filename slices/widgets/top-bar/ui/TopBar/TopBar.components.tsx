import { size } from '@shared/config';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 40px ${size.gap.default}px ${size.gap.small}px;
  gap: ${size.gap.default}px;
`