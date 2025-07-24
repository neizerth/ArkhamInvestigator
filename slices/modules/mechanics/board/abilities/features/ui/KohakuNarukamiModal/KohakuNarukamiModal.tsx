import { BlessCurseCount } from "@modules/chaos-bag/base/entities/ui/BlessCurseCount";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { selectModalData } from "@modules/core/modal/shared/base/lib";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { useAppSelector } from "@shared/lib";
import * as C from "./KohakuNarukamiModal.components";

export const KohakuNarukamiModal = () => {
	const data = useAppSelector(
		selectModalData,
	) as BaseModalData<BaseModalAction> | null;

	if (!data) {
		return;
	}

	return (
		<C.Modal id={CustomModalId.KohakuNarukami}>
			<C.Confirm data={data}>
				<C.Content>
					<BlessCurseCount />
				</C.Content>
			</C.Confirm>
		</C.Modal>
	);
};
