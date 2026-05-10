import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Share } from "react-native";

type Options = {
	path: string;
	name: string;
};

export const shareLogFile = async ({ path, name }: Options) => {
	const isAvailable = await Sharing.isAvailableAsync();
	if (isAvailable) {
		return Sharing.shareAsync(path, {
			dialogTitle: name,
			mimeType: "text/plain",
			UTI: "public.plain-text",
		});
	}

	const message = await FileSystem.readAsStringAsync(path, {
		encoding: FileSystem.EncodingType.UTF8,
	});

	return Share.share(
		{
			title: name,
			message,
		},
		{ subject: name },
	);
};
