import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { color, gameAssets } from '@shared/config';
import { Value as BaseValue } from '../Value';
import styled from 'styled-components/native';

export const BaseContainer = withStat(UI.Clue, {
  ratio: gameAssets.clue.ratio
})

export const Container: typeof BaseContainer = styled(BaseContainer)`
  padding-left: 6px;
  padding-top: 5px;
`

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.clue}
`