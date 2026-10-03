import type { ViewProps } from "react-native";
import * as C from "./SafeContent.components";

export type PageContentProps = ViewProps & {
	full?: boolean;
};

export const SafeContent = ({ full, ...props }: PageContentProps) => {
	const Content = full ? C.FullContent : C.Content;
	return <Content {...props} />;
};
