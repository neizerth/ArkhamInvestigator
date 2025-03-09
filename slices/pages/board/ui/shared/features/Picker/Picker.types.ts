import type { ReactElement, RefObject } from "react"
import type { FlatList, FlatListProps, ViewProps, ViewStyle } from "react-native"

export type PickerItemProps = {
  value: number
}

export type PickerRenderContainer = (props: ViewProps) => ReactElement | null

export type BaseListProps = FlatListProps<number>

type ContainerProps = {
  value?: number
  data?: number[]
  itemHeight?: number
  itemContainerStyle?: ViewStyle
  renderItemContainer?: PickerRenderContainer
}

export type PickerProps = ViewProps & ContainerProps & {
  onValueChanged: (value: number) => void
  renderItem: BaseListProps['renderItem']
}

export type PickerListProps = BaseListProps & ContainerProps & {
  onChange: PickerProps['onValueChanged']
  listRef: RefObject<FlatList>
}