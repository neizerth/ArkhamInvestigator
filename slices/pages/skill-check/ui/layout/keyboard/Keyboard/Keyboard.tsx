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
        <C.Button>C</C.Button>
        <C.CustomButton>
          <C.Backspace />
        </C.CustomButton>
        <C.Stats/>
      </C.Row>
      <C.Row>
        <C.Button>7</C.Button>
        <C.Button>8</C.Button>
        <C.Button>9</C.Button>
        <C.Button>{characters.divide}</C.Button>
      </C.Row>
      <C.Row>
        <C.Button>4</C.Button>
        <C.Button>5</C.Button>
        <C.Button>6</C.Button>
        <C.Button>{characters.multiply}</C.Button>
      </C.Row>
      <C.Row>
        <C.Button>1</C.Button>
        <C.Button>2</C.Button>
        <C.Button>3</C.Button>
        <C.Button>{characters.minus}</C.Button>
      </C.Row>
      <C.Row>
        <C.Placeholder/>
        <C.Button>0</C.Button>
        <C.Placeholder/>
        <C.Button>{characters.plus}</C.Button>
      </C.Row>
      <PrimaryButton styleType='transparent'>
        <C.EqualsText>Equals</C.EqualsText>
      </PrimaryButton>
    </C.Container>
  );
}
