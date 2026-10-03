import type { ViewProps } from "react-native";
import * as C from "./Page.components";

export type PageProps = ViewProps;
export const Page = (props: PageProps) => {
	return <C.Container {...props} />;
};
