import { PrimaryButton } from '@shared/ui';
import * as C from './Keyboard.components';
import { useAppDispatch, sendNumberSignal, sendOperatorSignal, sendCommandSignal, setHistoryShown, selectHistoryShown, useAppSelector } from '@shared/lib';
import { useCallback } from 'react';
import type { SkillCheckCommandType, SkillCheckOperator } from '@shared/model';
import { operatorMapping } from './mapping';
import { addCurrentSkillCheckToHistory } from '@shared/lib/store/features/board/actions/history/addCurrentSkillCheckToHistory';
import { LayoutContainer } from '../../LayoutContainer';
import { characters } from '@pages/skill-check/config';
import { useSkillCheckLayoutType } from '@pages/skill-check/lib';
import { useWindowDimensions } from 'react-native';

export type KeyboardProps = {

}

export const Keyboard = ({}: KeyboardProps) => {
  const dispatch = useAppDispatch();
  const historyShown = useAppSelector(selectHistoryShown);
  const window = useWindowDimensions();
  const showEquals = window.height > 590;
  const showRule = window.height > 670;

  const toggleHistory = useCallback(() => {
    dispatch(setHistoryShown(!historyShown));
  }, [dispatch, historyShown])

  const sendDigit = useCallback((value: number) => () => {
    dispatch(sendNumberSignal(value));
  }, [dispatch]);

  const sendOperator = useCallback((value: SkillCheckOperator) => () => {
    dispatch(sendOperatorSignal(value));
  }, [dispatch]);

  const sendCommand = useCallback((value: SkillCheckCommandType) => () => {
    dispatch(sendCommandSignal(value));
  }, [dispatch]);

  const equals = useCallback(() => {
    dispatch(addCurrentSkillCheckToHistory());
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
      <C.Content border={!showRule}>
        <LayoutContainer>
          {showRule && (
            <C.Row>
              <C.Back onPress={toggleHistory}>
                <C.Rule historyShown={historyShown}/>
              </C.Back>
            </C.Row>
          )}
          {!historyShown && (
            <>
              <C.Row>
                <C.CustomButton 
                  onPress={sendCommand('clear-last')}
                  onLongPress={sendCommand('clear')}
                >
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
                {showEquals ? (
                  <C.Placeholder/>
                ) : (
                  <C.Button onPress={equals} buttonType='primary'>{characters.equals}</C.Button>
                )}
                <C.Operator {...withOperatorProps('add')}/>
              </C.Row>
              {showEquals && (
                <PrimaryButton 
                  styleType='transparent' 
                  onPress={equals}
                >
                  <C.EqualsText>Equals</C.EqualsText>
                </PrimaryButton>
              )}
            </>
          )}
        </LayoutContainer>
      </C.Content>
    </C.Container>
  );
}
