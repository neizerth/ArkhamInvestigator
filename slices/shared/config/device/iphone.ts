import { Dimensions, Platform } from "react-native";

const window = Dimensions.get("window");

const height = Math.max(window.height, window.width);

const ios = Platform.OS === "ios";
const iPhoneXHeight = 812;
const gteiPhoneX = ios && height >= iPhoneXHeight;

export const IOS_WITH_GESTURE_CONTROL = gteiPhoneX;
