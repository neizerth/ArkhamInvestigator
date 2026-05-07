import { selectNavbarHeight } from "@modules/core/device/shared/lib";
import type { ViewProps } from "react-native";
import { useAppSelector } from "slices/shared/lib";
import * as C from "./PageContent.components";

export type PageContentProps = ViewProps & {
	full?: boolean;
};

export const PageContent = ({ full, ...props }: PageContentProps) => {
	const navbarHeight = useAppSelector(selectNavbarHeight);
	const Content = full ? C.FullContent : C.Content;
	return <Content {...props} navbarHeight={navbarHeight} />;
};
