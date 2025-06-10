import { HapticSelect } from "@modules/core/haptic/shared/ui";
import { color, size } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { StoreTabs } from "../../../../navigation/store-tabs";

export const Container: typeof View = styled(View)`
  
`;

export const Tabs: typeof StoreTabs = styled(StoreTabs)`
  
`;

export const Select: typeof HapticSelect = styled(HapticSelect)`
  background-color: ${color.dark30};
  border: 1px solid ${color.dark20};
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

export const FFG: typeof Icon = styled(Icon)`
  color: ${color.ffg.light};
`;

export const EnIcon: typeof Icon = styled(Icon)`
  color: ${color.gray20};
  text-align: center;
`;

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.small}px ${size.gap.default}px;
  gap: ${size.gap.small}px;
  align-items: center;
  min-height: 48px;
`;

export const ItemText: typeof Text = styled(Text)`
  
`;

export const ItemIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
  text-align: center;
  width: 24px;
`;
