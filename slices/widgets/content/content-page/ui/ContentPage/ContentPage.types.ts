import type { PageProps } from "@shared/ui";
import type { ViewProps } from "react-native";

export type ContentPageProps = PageProps &
	WideProps & {
		title: string;
		onBack?: () => void;
		contentStyle?: ViewProps["style"];
	};

export type WideProps = {
	full?: boolean;
};
