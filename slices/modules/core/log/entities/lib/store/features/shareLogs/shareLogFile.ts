import { Share } from "react-native";

type Options = {
	path: string;
	name: string;
};

export const shareLogFile = ({ path, name }: Options) => {
	return Share.share({
		title: "Logs",
		url: path,
		message: name,
	});
};
