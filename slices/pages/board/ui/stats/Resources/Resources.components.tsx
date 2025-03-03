import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { assetsSize } from '@pages/board/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';
import { View } from 'react-native';

export const Container = withStat(UI.Resource, {
  height: assetsSize.resource,
  ratio: gameAssets.resource.ratio
})

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.resource};
`