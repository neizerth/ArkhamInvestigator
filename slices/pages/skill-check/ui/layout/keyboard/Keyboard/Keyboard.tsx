import { PrimaryButton } from '@shared/ui';
import * as C from './Keyboard.components';
import { useWindowDimensions } from 'react-native';
import { characters } from '@pages/skill-check/config';
import { goBack, useAppDispatch, sendDigitSignal, sendOperatorSignal, sendCommandSignal } from '@shared/lib';
import { useCallback } from 'react';
import { SkillCheckCommand, SkillCheckOperator } from '@shared/model';
import { operatorMapping } from './mapping';

export type KeyboardProps = {

}

export const Keyboard = ({}: KeyboardProps) => {
  const window = useWindowDimensions();
  const dispatch = useAppDispatch();

  const back = () => {
    dispatch(goBack());
  }

  const sendDigit = useCallback((value: number) => () => {
    dispatch(sendDigitSignal(value));
  }, [dispatch]);

  const sendOperator = useCallback((value: SkillCheckOperator) => () => {
    dispatch(sendOperatorSignal(value));
  }, [dispatch]);

  const sendCommand = useCallback((value: SkillCheckCommand) => () => {
    dispatch(sendCommandSignal(value));
  }, [dispatch]);

  const withDigitProps = (value: number) => ({
    onPress: sendDigit(value),
    children: value
  })

  const withOperatorProps = (value: SkillCheckOperator) => ({
    onPress: sendOperator(value),
    children: operatorMapping[value]
  })

  return (
    <C.Container>
      <C.Row>
        <C.Back onPress={back}>
          <C.Rule box={window}/>
        </C.Back>
      </C.Row>
      <C.Row>
        <C.Clear onPress={sendCommand('clear')}>C</C.Clear>
        <C.CustomButton onPress={sendCommand('clear-last')}>
          <C.Backspace />
        </C.CustomButton>
        <C.Stats/>
      </C.Row>
      <C.Row>
        <C.Button {...withDigitProps(7)}/>
        <C.Button {...withDigitProps(8)}/>
        <C.Button {...withDigitProps(9)}/>
        <C.Operator {...withOperatorProps('divide')}/>
      </C.Row>
      <C.Row>
        <C.Button {...withDigitProps(4)}/>
        <C.Button {...withDigitProps(5)}/>
        <C.Button {...withDigitProps(6)}/>
        <C.Operator {...withOperatorProps('multiply')}/>
      </C.Row>
      <C.Row>
        <C.Button {...withDigitProps(1)}/>
        <C.Button {...withDigitProps(2)}/>
        <C.Button {...withDigitProps(3)}/>
        <C.Operator {...withOperatorProps('subtract')}/>
      </C.Row>
      <C.Row>
        <C.Placeholder/>
        <C.Button {...withDigitProps(0)}/>
        <C.Placeholder/>
        <C.Operator {...withOperatorProps('add')}/>
      </C.Row>
      <PrimaryButton styleType='transparent'>
        <C.EqualsText>Equals</C.EqualsText>
      </PrimaryButton>
    </C.Container>
  );
}
