import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { AppNotification } from "../AppNotification";

export const Notification: typeof AppNotification = styled(AppNotification)`
  position: absolute;
  left: ${size.gap.default}px;
  right: ${size.gap.default}px;
  bottom: ${size.gap.default}px;
`;

export const Container: typeof View = styled(View)`
  position: relative;
`;
