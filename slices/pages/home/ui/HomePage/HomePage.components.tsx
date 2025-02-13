import { COLOR } from '@shared/config';
import { styled } from '@shared/lib';
import { View } from 'react-native';

export const Container = styled(View)`
  background-color: ${COLOR.DARK30};
  flex: 1;
  align-items: center;
  justify-content: center;
`