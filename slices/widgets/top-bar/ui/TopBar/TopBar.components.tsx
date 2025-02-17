import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;
`