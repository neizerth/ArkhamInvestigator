import { GAP, IMAGE_RATIO, IMAGE_SIZE } from "@widgets/investigator-list/config/styles";
import { 
  Dimensions, 
  Image as NativeImage,
  View 
} from "react-native";
import styled from "styled-components/native";

export const Image: typeof NativeImage = styled(NativeImage)
  .attrs({
    resizeMode: 'cover',
    resizeMethod: 'resize'
  })`
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE / IMAGE_RATIO}px;
  ` 

export const Container: typeof View = styled(View)`
  height: ${IMAGE_SIZE}px;
  overflow: hidden;
`