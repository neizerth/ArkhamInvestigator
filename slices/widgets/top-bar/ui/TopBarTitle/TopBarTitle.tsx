import { font } from "@shared/config";
import { Title } from "@shared/ui";
import styled from "styled-components/native";

export const TopBarTitle: typeof Title = styled(Title)`
  flex: 1;
  font-size: ${font.size.medium}px;
  padding-right: 20px;
`;
