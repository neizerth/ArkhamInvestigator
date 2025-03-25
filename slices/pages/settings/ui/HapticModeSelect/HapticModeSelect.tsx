import { Select, SelectItem } from '@shared/ui';
import * as C from './HapticModeSelect.components';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { defaultModeFeedback, selectHapticMode, setHapticMode, useHapticFeedback } from '@features/haptic';
import { HapticMode } from '@shared/model';
import { useAppTranslation } from '@features/i18n';
import { propEq } from 'ramda';
import { useCallback } from 'react';

export type HapticModeSelectProps = {

}

type Item = SelectItem<HapticMode>;

export const HapticModeSelect = ({}: HapticModeSelectProps) => {
  const { t } = useAppTranslation();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectHapticMode);

  const data: Item[] = [
    {
      label: t`Default`,
      value: 'default'
    },
    {
      label: t`System (if available)`,
      value: 'system'
    },
    {
      label: t`No`,
      value: false
    }
  ]

  const impactFeedback = useHapticFeedback();

  const onChange = useCallback(
      ({ value }: SelectItem<HapticMode>) => {
        if (value) {
          const feedback = defaultModeFeedback[value];
          impactFeedback(feedback);
        }
        
        dispatch(setHapticMode(value));
      },
      [dispatch, impactFeedback],
    );
  
  
  const value = data.find(propEq(mode, 'value')); 
  return (
    <C.Container>
      <C.Picker
        data={data}
        value={value}
        onChange={onChange}
      />
    </C.Container>
  );
}