import { useGoBack } from "@modules/core/router/shared/lib";
import { setReferenceCardCode } from "@modules/stories/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagReferenceEditPage.components";

export type ChaosBagReferenceEditPageProps = ViewProps;

export const ChaosBagReferenceEditPage = (
	props: ChaosBagReferenceEditPageProps,
) => {
	const dispatch = useAppDispatch();

	const back = useGoBack();

	const removeReference = useCallback(() => {
		back();
		dispatch(setReferenceCardCode(null));
	}, [dispatch, back]);

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
			onClose={back}
		>
			<C.Select onClose={back} />
		</C.Container>
	);
};
