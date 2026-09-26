import BaseSlider from "@react-native-community/slider";
import styled from "styled-components/native";

export const Slider: typeof BaseSlider = styled(BaseSlider).attrs(
	({ theme }) => ({
		minimumTrackTintColor: theme.color.dark10,
		maximumTrackTintColor: theme.color.dark10,
		thumbTintColor: theme.color.light10,
	}),
)`

`;
