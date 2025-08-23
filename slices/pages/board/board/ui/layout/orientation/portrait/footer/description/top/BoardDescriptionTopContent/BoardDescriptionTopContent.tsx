import {
	selectShowDescription,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { delay, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardDescriptionTopContent.components";

export type BoardDescriptionTopContentProps = ViewProps;

export const BoardDescriptionTopContent = (
	props: BoardDescriptionTopContentProps,
) => {
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
