import { goBack, setReferenceCardCode, useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagReferenceEditPage.components";

export type ChaosBagReferenceEditPageProps = ViewProps;

export const ChaosBagReferenceEditPage = (
	props: ChaosBagReferenceEditPageProps,
) => {
	const dispatch = useAppDispatch();

	const removeReference = useCallback(() => {
		dispatch(goBack());
		dispatch(setReferenceCardCode(null));
	}, [dispatch]);

	const actions = useMemo(() => {
		return [
			{
				icon: "trash",
				onAction: removeReference,
			},
		];
	}, [removeReference]);

	return (
		<C.Container {...props} title="Scenario reference" actions={actions}>
			<C.Select />
		</C.Container>
	);
};
