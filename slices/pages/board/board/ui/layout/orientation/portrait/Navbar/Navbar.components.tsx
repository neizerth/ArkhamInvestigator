import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  position: absolute;
	z-index: 5;
	bottom: 0;
	height: ${({ theme }) => theme.navbarHeight}px;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.7);
`;
