import { View } from "react-native";
import styled from "styled-components/native";

const size = 60;
const borderSize = 2;
const imageSize = size - borderSize * 2;

export const ImageContainer: typeof View = styled(View)`
	position: absolute;
	top: 0;
	left: 0;
	border-radius: ${imageSize}px;
	width: ${imageSize}px;
	height: ${imageSize}px;
`;
