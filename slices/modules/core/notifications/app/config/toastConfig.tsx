import type { ToastConfig } from "react-native-toast-message";
import { Toast } from "../../shared/ui";

export const toastConfig: ToastConfig = {
	success: (props) => <Toast {...props} type="success" />,
	error: (props) => <Toast {...props} type="error" />,
	info: (props) => <Toast {...props} type="info" />,
};
