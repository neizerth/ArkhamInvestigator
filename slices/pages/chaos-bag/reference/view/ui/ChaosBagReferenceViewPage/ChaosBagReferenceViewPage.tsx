import { goBack, useAppDispatch } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./ChaosBagReferenceViewPage.components";

export const ChaosBagReferenceViewPage = () => {
	const dispatch = useAppDispatch();

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu />
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
