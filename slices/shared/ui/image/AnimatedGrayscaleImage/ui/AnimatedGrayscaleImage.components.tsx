import { Image as BaseImage, View } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";

const absoluteFill = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const Container: typeof View = styled(View)`
  ${absoluteFill}
`;

export const AnimatedContainer: typeof Animated.View = styled(Animated.View)`
  ${absoluteFill}
`;

export const GrayscaleContainer: typeof AnimatedContainer = styled(
	AnimatedContainer,
)`
  ${absoluteFill}
  z-index: 3;
`;

export const Image: typeof BaseImage = styled(BaseImage)`
  z-index: 1;
`;

export const GrayscaleImage: typeof Image = styled(Image)`
`;
