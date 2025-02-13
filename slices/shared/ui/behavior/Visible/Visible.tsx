import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

export type VisibleProps = PropsWithChildren & {
  show: boolean
}

export const Visible = ({
  show,
  children
}: VisibleProps) => {
  return (
    <View>
      {show && children}
    </View>
  )
}