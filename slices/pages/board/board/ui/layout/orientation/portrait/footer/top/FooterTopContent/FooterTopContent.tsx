import {
	delay,
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useEffect, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FooterTopContent.components";

export type FooterTopContentProps = ViewProps;

export const FooterTopContent = (props: FooterTopContentProps) => {
	const dispatch = useAppDispatch();
	const defaultShow = useAppSelector(selectShowDescription);

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (defaultShow) {
			delay(350).then(() => setShow(true));
			return;
		}
		setShow(false);
	}, [defaultShow]);

	const hideDescription = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	return (
		<C.Container {...props} style={[props.style]}>
			{show && (
				<>
					<C.ExpandArea onPress={hideDescription} />
					<C.Secondary />
					<C.TopMenu />
				</>
			)}
		</C.Container>
	);
};
