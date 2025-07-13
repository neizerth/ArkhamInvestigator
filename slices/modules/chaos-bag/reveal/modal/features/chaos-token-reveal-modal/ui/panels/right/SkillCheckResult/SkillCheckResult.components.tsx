import { color } from "@shared/config";
import { UnscaledText, Value } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  align-items: center;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  justify-content: center;
  min-height: 40px;
`;

export const Result: typeof View = styled(View)`
  position: relative;
`;

export const ResultValue: typeof Value = styled(Value)`
  font-size: 38px;
`;

export const CompareSymbol: typeof UnscaledText = styled(UnscaledText)`
  position: absolute;
  top: 0px;
  left: -16px;
  color: ${color.white};
  font-size: 25px;
`;
