import { withStat } from '@pages/board/lib/hoc/withStat';
import * as UI from "@shared/ui";
import { gameAssets } from '@shared/config';
import { assetsSize } from '@pages/board/config';

export const Container = withStat(UI.Resource, {
  height: assetsSize.resource,
  ratio: gameAssets.resource.ratio
})