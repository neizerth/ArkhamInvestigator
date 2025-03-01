import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { gameAssets } from '@shared/config';

export const Container = withStat(UI.Clue, {
  ratio: gameAssets.clue.ratio
})