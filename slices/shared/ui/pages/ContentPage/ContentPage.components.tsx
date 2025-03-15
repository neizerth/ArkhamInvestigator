import { size } from "@shared/config";
import type { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import type { ContentPageProps, WideProps } from "./ContentPage.types";
import { ScrollViewProps, View } from "react-native";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: ${size.gap.medium}px;
  padding-top: 0;
`