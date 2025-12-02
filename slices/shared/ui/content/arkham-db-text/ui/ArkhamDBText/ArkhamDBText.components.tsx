import { Image as BaseImage } from "expo-image";
import { View } from "react-native";
import styled from "styled-components/native";
import { UnscaledText } from "../../../../behavior";
import { Row } from "../../../../grid";

export const Text: typeof UnscaledText = styled(UnscaledText)`
`;

export const Word: typeof Row = styled(Row)`
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

export const Image: typeof BaseImage = styled(BaseImage).attrs({
	cachePolicy: "disk",
	contentFit: "contain",
})`
  
`;

export const Container: typeof View = styled(View)`
  gap: 5px;
`;
