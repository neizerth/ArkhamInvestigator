import { size } from "@shared/config";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { StoreSelect } from "@widgets/control/store-select";
import { StoreSlider } from "@widgets/control/store-slider";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Row: typeof View = styled(View)`
  flex: 1;
`;

export const Select: typeof StoreSelect = styled(StoreSelect)`
  flex: 1
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox)`
  flex: 1;
  justify-content: flex-end;
`;

export const Slider: typeof StoreSlider = styled(StoreSlider)`

`;
