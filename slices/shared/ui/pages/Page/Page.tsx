import { selectNavbarHeight } from "@modules/core/device/shared/lib";
import type { ViewProps } from "react-native";
import { useAppSelector } from "../../../lib/hooks/store/useAppSelector";
import * as C from "./Page.components";

export type PageProps = ViewProps;
export const Page = (props: PageProps) => {
	const navbarHeight = useAppSelector(selectNavbarHeight);
	return <C.Container {...props} navbarHeight={navbarHeight} />;
};
