import { color } from "@shared/config";
import { ContentPage } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
`