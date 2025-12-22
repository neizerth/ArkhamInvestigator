import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { size } from "@shared/config";
import { Button, Checkbox, Row, Table } from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { View } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage)`
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const List: typeof Table = styled(Table)`
`;

export const Actions: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
  justify-content: space-between;
`;

export const TitleCell: typeof View = styled(View)`
`;

export const AutoRun: typeof Checkbox = styled(Checkbox)`
`;

export const Clear: typeof Button = styled(Button)`
`;

export const Run: typeof Button = styled(Button)`
  justify-content: center;
`;

export const Result: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  min-height: 35px;
`;
