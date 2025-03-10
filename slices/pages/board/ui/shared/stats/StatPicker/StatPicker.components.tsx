import styled from 'styled-components/native';
import { Picker as BasePicker } from '@widgets/picker';
import { ValueMemo as BaseValue, type ValueProps as BaseValueProps } from '../Value';
import type { FC } from 'react';
import { View } from 'react-native';


export const Picker: typeof BasePicker = styled(BasePicker)
  .attrs({
    contentContainerStyle: {
      justifyContent: 'center'
    },
    listStyle: {
      borderRadius: 80
    },
    gap: 48
  })`
  
  `

export const Item: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
` 


export const Value: FC<BaseValueProps> = styled(BaseValue)
  .attrs({
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  })`
  justify-content: center;
  align-items: center;
`