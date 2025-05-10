import { delay, selectShowDescription, useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FooterTopContent.components";

export type FooterTopContentProps = ViewProps;

export { TOP_CONTENT_OFFSET } from "./FooterTopContent.components";

export const FooterTopContent = (props: FooterTopContentProps) => {
	const defaultShow = useAppSelector(selectShowDescription);

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (defaultShow) {
			delay(350).then(() => setShow(true));
			return;
		}
		setShow(false);
	}, [defaultShow]);

	return (
		<C.Container {...props} style={[props.style]}>
			{show && (
				<>
					<C.Secondary />
					<C.TopMenu />
				</>
			)}
		</C.Container>
	);
};
