import { AutoFail, AutoSuccessThin } from "@modules/chaos-bag/base/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  width: 31px;
`;

export const Success: typeof AutoSuccessThin = styled(AutoSuccessThin)`
  height: 42px;
`;

export const Fail: typeof AutoFail = styled(AutoFail)`
  font-size: 32px;
	line-height: 40px;
	width: 40px;
`;
