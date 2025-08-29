import { loaderImage } from "@assets/images/ui/common";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
    justify-content: center;
    align-items: center;
  `;

export const Image: typeof Animated.Image = styled(Animated.Image).attrs({
	source: loaderImage,
})`
    
  `;
