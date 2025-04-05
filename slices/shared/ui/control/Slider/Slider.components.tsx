import BaseSlider from "@react-native-community/slider";
import { color } from "@shared/config";
import styled from "styled-components/native";

export const Slider: typeof BaseSlider = styled(BaseSlider).attrs({
	minimumTrackTintColor: color.dark10,
	maximumTrackTintColor: color.dark10,
	thumbTintColor: color.light10,
})`

`;
