import { ChaosBagContents } from "@features/chaos-bag";
import { color } from "@shared/config";
import { ContentPage } from "@widgets/content";
import styled from "styled-components/native";

export const Container: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
`;

export const Bag: typeof ChaosBagContents = styled(ChaosBagContents)`
  
`;
