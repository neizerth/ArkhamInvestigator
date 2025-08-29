import {
	selectShowDescription,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardDescriptionTopContent.components";

export type BoardDescriptionTopContentProps = ViewProps;

export const BoardDescriptionTopContent = (
	props: BoardDescriptionTopContentProps,
) => {
	const dispatch = useAppDispatch();
	const defaultShow = useAppSelector(selectShowDescription);
	const showTimer = useRef<NodeJS.Timeout>(null);

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (showTimer.current) {
			clearTimeout(showTimer.current);
		}
		if (defaultShow) {
			showTimer.current = setTimeout(() => setShow(true), 350);
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
