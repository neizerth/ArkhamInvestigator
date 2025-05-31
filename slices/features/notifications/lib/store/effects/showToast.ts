import type { AppThunk } from "@shared/model";
import Toast from "react-native-simple-toast";

export const showToast =
	(message: string, duration = Toast.SHORT): AppThunk =>
	() => {
		Toast.show(message, duration);
	};
