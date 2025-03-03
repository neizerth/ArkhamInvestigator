import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';
import { View } from 'react-native';

export const BaseContainer = withStat(UI.Clue, {
  ratio: gameAssets.clue.ratio
})

export const Container: typeof BaseContainer = styled(BaseContainer)`
  align-items: center;
  justify-content: center;
`

export const ValueText: typeof BaseValue = styled(BaseValue)`
  color: ${color.clue};
`

export const Value: typeof View = styled(View)`
  position: absolute;
  top: -3px;
  left: 8px;
` 