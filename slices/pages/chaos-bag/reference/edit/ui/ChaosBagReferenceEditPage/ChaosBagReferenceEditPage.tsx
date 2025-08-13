import { setReferenceCardCode } from "@modules/stories/shared/lib";
import { goBack, useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagReferenceEditPage.components";

export type ChaosBagReferenceEditPageProps = ViewProps;

export const ChaosBagReferenceEditPage = (
	props: ChaosBagReferenceEditPageProps,
) => {
	const dispatch = useAppDispatch();

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

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
		<C.Container
			{...props}
			title="Scenario reference"
			actions={actions}
			closeIcon="check"
			onClose={back}
		>
			<C.Select onClose={back} />
		</C.Container>
	);
};
