import { COLOR } from '@shared/config';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container: typeof View = styled(View)`
  background-color: ${COLOR.BLACK};
  flex: 1;
  align-items: center;
  justify-content: center;
`