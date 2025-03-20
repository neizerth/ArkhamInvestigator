import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const source = require("./images/loader.png");

export const Image: typeof Animated.Image = styled(Animated.Image).attrs({
	source,
})`
    
  `;
