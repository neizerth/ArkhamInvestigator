import type { HapticPatternType } from "@shared/model"
import type { ReactElement, RefObject } from "react"
import type { FlatList, FlatListProps, ViewProps, ViewStyle } from "react-native"
import type { ListRenderItemInfo } from "react-native"

export type PickerItemProps = {
  value: number
}

export type PickerRenderContainer = (info: PickerContainerInfo) => ReactElement

export type PickerItemInfo = ListRenderItemInfo<number>

export type PickerContainerInfo = PickerItemInfo & {
  renderItem?: BaseListProps['renderItem']
  itemHeight?: number
  itemContainerStyle?: ViewStyle
  currentValue?: number
}

export type BaseListProps = FlatListProps<number>

type ContainerProps = {
  value?: number
  data?: number[]
  itemContainerStyle?: ViewStyle
  renderItemContainer?: PickerRenderContainer
  visibleItemsCount?: number
  onPress?: () => void
  onLongPress?: () => void
  pressPattern?: HapticPatternType
  longPressPattern?: HapticPatternType
  delayLongPress?: number
  gap?: number
}

export type PickerChangeEvent = {
  value?: number
  index: number
}

export type PickerProps = ViewProps & ContainerProps & {
  onValueChanged?: (event: PickerChangeEvent) => void
  renderItem: BaseListProps['renderItem']
  itemHeight?: number
  listStyle?: BaseListProps['style']
}

export type PickerListProps = BaseListProps & ContainerProps & {
  onChange?: PickerProps['onValueChanged']
  itemHeight: number
}