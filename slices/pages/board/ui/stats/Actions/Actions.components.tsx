import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import { Action, Icon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { Value as BaseValue } from '../Value';

const Background = withStat(Action, {
  height: assetsSize.action,
  ratio: gameAssets.action.ratio
});

export const Container: typeof Background = styled(Background)`
  align-items: stretch;
  position: relative;
`

export const Content: typeof View = styled(View)`
  flex-grow: 1;
  position: relative;
`

export const AdditionalAction: typeof View = styled(View)`
  position: absolute;
  top: -25px;
  right: -15px;
`

export const ActionIcon: typeof Icon = styled(Icon)`
  font-size: 30px;
  color: ${color.white};
`



export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.action};
`