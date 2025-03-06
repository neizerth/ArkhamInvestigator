import { ScrollViewProps } from 'react-native';
import * as C from './StatsKeyboard.components';
import { sendStatSignal, useAppDispatch } from '@shared/lib';
import { InvestigatorBoardStat } from '@shared/model';
import { useCallback } from 'react';

export type StatsKeyboardProps = ScrollViewProps;

export const StatsKeyboard = ({
  ...props
}: StatsKeyboardProps) => {

  const dispatch = useAppDispatch();

  const sendStat = useCallback((value: InvestigatorBoardStat) => () => {
    dispatch(sendStatSignal(value));
  }, [dispatch]);

  const withProps = (value: InvestigatorBoardStat) => {
    return {
      icon: value,
      onPress: sendStat(value)
    }
  }

  return (
    <C.Container {...props} horizontal>
      <C.Content>
        <C.Rule/>
        <C.Button {...withProps('willpower')}/>
        <C.Rule/>
        <C.Button {...withProps('intellect')}/>
        <C.Rule/>
        <C.Button {...withProps('combat')}/>
        <C.Rule/>
        <C.Button {...withProps('agility')}/>
        <C.Rule/>
        <C.Button {...withProps('health')}/>
        <C.Rule/>
        <C.Button {...withProps('sanity')}/>
        <C.Rule/>
        <C.Button icon="resource" onPress={sendStat('resources')}/>
      </C.Content>
    </C.Container>
  );
}