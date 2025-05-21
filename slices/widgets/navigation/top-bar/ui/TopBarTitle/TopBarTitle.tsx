import { font } from "@shared/config";
import { Title, type TitleProps } from "@shared/ui";
import styled from "styled-components/native";

export type TopBarTitleProps = TitleProps;

export const TopBarTitle: typeof Title = styled(Title)`
  flex: 1;
  font-size: ${font.size.medium}px;
`;
