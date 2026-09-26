import { Button } from "@shared/ui";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { cthulhuImage } from "./images";

export const List: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Cthulhu: typeof Image = styled(Image).attrs({
	source: cthulhuImage,
})`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    padding-left: ${({ theme }) => theme.size.gap.large}px;
  `;

export { Button };
