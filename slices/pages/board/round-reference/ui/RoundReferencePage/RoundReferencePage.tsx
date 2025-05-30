import { goBack, useAppDispatch } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./RoundReferencePage.components";

export const RoundReferencePage = () => {
	const dispatch = useAppDispatch();
	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Reference />
		</C.Container>
	);
};
