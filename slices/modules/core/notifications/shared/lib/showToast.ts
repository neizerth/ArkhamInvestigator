import Toast from "react-native-simple-toast";
import type { ToastDuration } from "../model";
import { getToastDuration } from "./getToastDuration";

export type ShowToastOptions = {
	message: string;
	duration?: ToastDuration;
};

export const showToast = ({
	message,
	duration = Toast.SHORT,
}: ShowToastOptions) => {
	const toastDuration = getToastDuration(duration);
	Toast.show(message, toastDuration);
};
