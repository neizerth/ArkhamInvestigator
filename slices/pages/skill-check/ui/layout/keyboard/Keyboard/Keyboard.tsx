import { PrimaryButton } from '@shared/ui';
import * as C from './Keyboard.components';
import { useWindowDimensions } from 'react-native';
import { characters } from '@pages/skill-check/config';
import { goBack, useAppDispatch } from '@shared/lib';

export type KeyboardProps = {

}

export const Keyboard = ({}: KeyboardProps) => {
  const window = useWindowDimensions();
  const dispatch = useAppDispatch();
  const back = () => {
    dispatch(goBack());
  }
  return (
    <C.Container>
      <C.Row>
        <C.Back onPress={back}>
          <C.Rule box={window}/>
        </C.Back>
      </C.Row>
      <C.Row>
        <C.Button type='text'>
          C
        </C.Button>
        <C.Button type="custom">
          <C.Backspace />
        </C.Button>
        <C.Stats horizontal>
          <C.StatsRow>
            <C.StatRule/>
            <C.Stat icon='willpower'/>
            <C.StatRule/>
            <C.Stat icon='intellect'/>
            <C.StatRule/>
            <C.Stat icon='combat'/>
            <C.StatRule/>
            <C.Stat icon='agility'/>
            <C.StatRule/>
            <C.Stat icon='health'/>
            <C.StatRule/>
            <C.Stat icon='sanity'/>
            <C.StatRule/>
            <C.Stat icon='resource'/>
        </C.StatsRow>
        </C.Stats>
      </C.Row>
      <C.Row>
        <C.Button value={7}/>
        <C.Button value={8}/>
        <C.Button value={9}/>
        <C.Button value={characters.divide}/>
      </C.Row>
      <C.Row>
        <C.Button value={4}/>
        <C.Button value={5}/>
        <C.Button value={6}/>
        <C.Button value={characters.multiply}/>
      </C.Row>
      <C.Row>
        <C.Button value={1}/>
        <C.Button value={2}/>
        <C.Button value={3}/>
        <C.Button value={characters.minus}/>
      </C.Row>
      <C.Row>
        <C.Placeholder/>
        <C.Button value={0}/>
        <C.Placeholder/>
        <C.Button value={characters.plus}/>
      </C.Row>
      <PrimaryButton styleType='transparent'>
        <C.EqualsText>Equals</C.EqualsText>
      </PrimaryButton>
    </C.Container>
  );
}
