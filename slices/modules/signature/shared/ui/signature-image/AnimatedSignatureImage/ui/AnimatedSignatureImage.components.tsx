import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { StaticSignatureImage } from "../../StaticSignatureImage";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const AnimatedContainer: typeof Animated.View = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const GrayscaleContainer: typeof AnimatedContainer = styled(
	AnimatedContainer,
)`
  position: absolute;
  z-index: 2;
  flex: 1;
  opacity: 0;
`;

export const Image: typeof StaticSignatureImage = styled(StaticSignatureImage)`
  z-index: 1;
`;

export const GrayscaleImage: typeof Image = styled(Image)`
`;
