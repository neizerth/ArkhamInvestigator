import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';

export const Container = withStat(UI.Health, {
  ratio: gameAssets.health.ratio
})

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.health}
`