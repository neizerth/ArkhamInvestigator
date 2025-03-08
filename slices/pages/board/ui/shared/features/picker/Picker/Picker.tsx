import { impactHapticFeedback } from '@features/haptic';
import * as C from './Picker.components';
import WheelPicker, { type WheelPickerProps } from '@quidone/react-native-wheel-picker';

type PickerItem = {
  value: number
}

export type PickerProps = Omit<WheelPickerProps<PickerItem>, 'data'> & {
  data: number[]
};

export const Picker = ({
  ...props
}: PickerProps) => {
  const data = props.data
    .map(value => ({
      value
    }))

  const onValueChanging = () => {
    impactHapticFeedback('effectTick');
  }

  return (
    <WheelPicker
      {...props}
      data={data}
      onValueChanging={onValueChanging}
    />
  );
}