import { size } from "@shared/config";
import type { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import type { ContentPageProps, WideProps } from "./ContentPage.types";
import type { ScrollViewProps } from "react-native";

type ContentProps = WideProps & ScrollViewProps;

export const Content: FC<ContentProps> = styled(ScrollView)`
  flex: 1;
  ${({ full }: ContentPageProps) => !full && css`
    padding: ${size.gap.medium}px;
    padding-top: 0;
  `}
`