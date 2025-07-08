import Toast, { type ToastShowParams } from "react-native-toast-message";

export type ShowToastOptions = ToastShowParams & {
	message: string;
};

export const showToast = ({ message, ...props }: ShowToastOptions) => {
	Toast.show({
		...props,
		text1: message,
	});
};
