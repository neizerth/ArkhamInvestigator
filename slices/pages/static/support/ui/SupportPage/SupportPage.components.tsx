import { Button } from "@features/haptic";
import { size } from "@shared/config";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { cthulhuImage } from "./images";

export const List: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Cthulhu: typeof Image = styled(Image).attrs({
	source: cthulhuImage,
})`
    width: 200px;
    height: 200px;
    margin: 0 auto;
  `;

export { Button };
