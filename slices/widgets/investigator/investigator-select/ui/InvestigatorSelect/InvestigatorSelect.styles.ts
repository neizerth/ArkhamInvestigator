import { IOS_WITH_GESTURE_CONTROL, size } from "@shared/config";
import { Platform } from "react-native";
import { css } from "styled-components/native";

export const getFooterStyle = () => {
	if (Platform.OS !== "ios" || !IOS_WITH_GESTURE_CONTROL) {
		return css`
      bottom: ${size.gap.default}px;
      left: 0;
      right: 0;
    `;
	}
	return css`
    bottom: ${size.gap.large}px;
    left: ${size.gap.small}px;
    right: ${size.gap.small}px;
  `;
};
