import Toast from "react-native-simple-toast";
import type { ToastDuration } from "../../model";

const toastDurationMapping = {
	short: Toast.SHORT,
	long: Toast.LONG,
};

export const getToastDuration = (duration: ToastDuration) => {
	if (typeof duration === "number") {
		return duration;
	}
	return toastDurationMapping[duration];
};
