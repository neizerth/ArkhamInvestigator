import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import { Action, Icon, IconProps, TouchableOpacity } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { Value as BaseValue } from '../Value';
import { StatPicker } from "../StatPicker";
import { FC } from "react";

const BaseBackground = withStat(Action, {
  height: assetsSize.action,
  ratio: gameAssets.action.ratio
});

export const Container: typeof BaseBackground = styled(BaseBackground)`
  align-items: stretch;
  position: relative;
`

export const Content: typeof View = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const AdditionalAction: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  top: -30px;
  right: -20px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`


export const ActionIcon: typeof Icon = styled(Icon)`
  font-size: 30px;
  color: ${color.white};
`

export const UsedAction: typeof Icon = styled(Icon)`
  font-size: 35px;
  color: ${color.health};
  position: absolute;
`


export const Picker: typeof StatPicker = styled(StatPicker)
  .attrs({
    valueStyle: {
      color: color.action
    },
    itemHeight: assetsSize.action + 5
  })`
  ` 