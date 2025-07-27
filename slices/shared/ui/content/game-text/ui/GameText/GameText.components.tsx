import { View } from "react-native";
import styled from "styled-components/native";
import { UnscaledText } from "../../../../behavior";
import { Row } from "../../../../grid";

export const Text: typeof UnscaledText = styled(UnscaledText)`
  /* letter-spacing: 2; */
`;

export const Word: typeof Row = styled(Row)`
  /* flex: 1; */
  /* align-items: center; */
  /* align-items: flex-end; */
  flex-wrap: wrap;
`;

export const Token: typeof View = styled(View)`
  /* flex: 1; */
`;

export const Line: typeof UnscaledText = styled(UnscaledText)`
  
`;

export const Break: typeof View = styled(View)`
  
`;

export const Paragraph: typeof Row = styled(Row)`
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const Container: typeof View = styled(View)`
  gap: 5px;
`;
