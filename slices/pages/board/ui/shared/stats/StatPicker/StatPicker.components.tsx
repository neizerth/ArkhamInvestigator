import styled from 'styled-components/native';
import { Picker as BasePicker } from '../../features';
import { ValueMemo as BaseValue, type ValueProps as BaseValueProps } from '../Value';
import { FC } from 'react';
import { View } from 'react-native';


export const Picker: typeof BasePicker = styled(BasePicker)
  .attrs({
    overlayItemStyle: {
      justifyContent: 'center'
    },
    contentContainerStyle: {
      justifyContent: 'center'
    }
  })`
  
  `

export const Item: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
` 


export const Value: FC<BaseValueProps> = styled(BaseValue)`
    
`