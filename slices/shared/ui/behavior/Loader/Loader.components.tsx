import { loaderImage } from "@assets/images/ui/common";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Image: typeof Animated.Image = styled(Animated.Image).attrs({
	source: loaderImage,
})`
    
  `;
