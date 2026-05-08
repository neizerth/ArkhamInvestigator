import * as Sharing from "expo-sharing";
import { Share } from "react-native";

type Options = {
	path: string;
	name: string;
};

export const shareLogFile = async ({ path, name }: Options) => {
	if (await Sharing.isAvailableAsync()) {
		await Sharing.shareAsync(path, {
			dialogTitle: name,
			mimeType: "text/plain",
			UTI: "public.plain-text",
		});
		return;
	}

	await Share.share({
		title: name,
		url: path,
	});
};
