import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';
import { View } from 'react-native';

export const BaseContainer = withStat(UI.Health, {
  ratio: gameAssets.health.ratio
})

export const Container: typeof BaseContainer = styled(BaseContainer)`
`

export const ValueText: typeof BaseValue = styled(BaseValue)`
  color: ${color.health};
`

export const Value: typeof View = styled(View)`
  position: absolute;
  top: -10px;
  left: 0px;
` 