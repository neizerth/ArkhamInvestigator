import { ScrollViewProps } from 'react-native';
import * as C from './StatsKeyboard.components';

export type StatsKeyboardProps = ScrollViewProps;

export const StatsKeyboard = ({
  ...props
}: StatsKeyboardProps) => {
  return (
    <C.Container {...props} horizontal>
      <C.Content>
        <C.Rule/>
        <C.Button icon='willpower'/>
        <C.Rule/>
        <C.Button icon='intellect'/>
        <C.Rule/>
        <C.Button icon='combat'/>
        <C.Rule/>
        <C.Button icon='agility'/>
        <C.Rule/>
        <C.Button icon='health'/>
        <C.Rule/>
        <C.Button icon='sanity'/>
        <C.Rule/>
        <C.Button icon='resource'/>
      </C.Content>
    </C.Container>
  );
}