import { FC } from "react";
import { FlatList, View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";

export const Container = styled(View)`
  width: 100%;
`

export const List: typeof Animated.FlatList = styled(Animated.FlatList)`

`


export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`