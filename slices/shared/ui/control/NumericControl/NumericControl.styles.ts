import { font } from "../../../config";

export const getDefaultButtonTextStyle = (ios: boolean) => ({
	fontSize: font.size.xl,
	lineHeight: font.size.xl,
	top: ios ? 3 : -2,
});
