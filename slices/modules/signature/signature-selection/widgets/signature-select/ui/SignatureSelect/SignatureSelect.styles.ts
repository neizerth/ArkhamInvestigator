import type { AppTheme } from "@shared/model";
import { css } from "styled-components/native";

export const getFooterStyle = ({
	platform: { ios, iosGestureControl },
	size,
}: AppTheme) => {
	if (!ios || !iosGestureControl) {
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

export const getListPaddingBottom = ({
	platform: { ios, iosGestureControl },
}: AppTheme) => {
	if (!ios || !iosGestureControl) {
		return 65;
	}
	return 70;
};
