import { createChaosBag } from "@features/chaos-bag";
import { useAppDispatch } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./ChaosBagPage.components";

export const ChaosBagPage = () => {
	const dispatch = useAppDispatch();

	const createBag = useCallback(() => {
		dispatch(createChaosBag());
	}, [dispatch]);

	return (
		<C.Container title="Chaos bag" onBack={createBag} full>
			<Delay>
				<C.Bag />
			</Delay>
		</C.Container>
	);
};
1;
