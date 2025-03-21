import { color, size } from "@shared/config";
import { ContentPage } from "@widgets/content-page";
import { View } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
  padding-bottom: ${size.gap.default}px;
`;
