import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { assetsSize } from '@pages/board/config';
import { StatPicker } from '../StatPicker';

export const BaseContainer = withStat(UI.Sanity, {
  ratio: gameAssets.sanity.ratio
})

export const Container: typeof BaseContainer = styled(BaseContainer)`
  padding-bottom: 3px;
`


export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.sanity};
`

export const Picker: typeof StatPicker = styled(StatPicker)
  .attrs({
    valueStyle: {
      color: color.sanity
    },
    itemHeight: assetsSize.main
  })`
  
  ` 