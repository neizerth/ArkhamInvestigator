import { openReferenceCard } from "@entities/reference-card";
import { selectRevealHistorySize } from "@modules/chaos-bag/reveal/history/shared/lib";
import { routes } from "@shared/config";
import {
	delay,
	goBack,
	goToPage,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Href } from "expo-router";
import { useCallback, useMemo } from "react";

export const useModalActions = () => {
	const dispatch = useAppDispatch();

	const historySize = useAppSelector(selectRevealHistorySize);
	const showHistory = historySize > 0;

	const goTo = useCallback(
		(href: Href) => async () => {
			dispatch(goBack());
			await delay(300);
			dispatch(goToPage(href));
		},
		[dispatch],
	);

	const openReference = useCallback(async () => {
		dispatch(goBack());
		await delay(300);
		dispatch(openReferenceCard());
	}, [dispatch]);

	return useMemo(() => {
		const edit = {
			icon: "edit",
			onAction: goTo(routes.chaosBag),
		};
		const history = {
			icon: "history",
			onAction: goTo(routes.chaosBagHistory),
		};

		const reference = {
			icon: "list2",
			onAction: openReference,
		};

		if (!showHistory) {
			return [edit, reference];
		}

		return [edit, reference, history];
	}, [goTo, showHistory, openReference]);
};
