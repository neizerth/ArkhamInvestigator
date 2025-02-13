import { COLOR } from "@shared/config";
import * as ReactNative from "react-native";
import styled from "styled-components/native";

const background = require('./images/start.svg');

export const Container: typeof ReactNative.TouchableOpacity = styled.TouchableOpacity`
  height: 60px;
  justify-content: center;
  align-items: center;
`

export const Background: typeof ReactNative.ImageBackground = styled(ReactNative.ImageBackground)
  .attrs({
    source: background,
    resizeMode: 'contain',
    resizeMethod: 'resize'
  })`
    width: 250px;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
  `

export const Text: typeof ReactNative.Text = styled.Text`
  font-family: Teutonic;
  font-size: 32px;
  color: ${COLOR.LIGHT10};
`