import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { BoardSelectModal } from "@modules/core/modal/widgets/ui";
import type { SignatureDetailItem } from "@modules/signature/base/shared/model";
import { useCallback, useState } from "react";
import * as C from "./LuciaDeverauxModal.components";
import { useModalProps } from "./lib/useModalProps";

export const LuciaDeverauxModal = () => {
	const [id, setId] = useState<number | undefined>();
	const props = useModalProps(id);

	const onChange = useCallback(
		(item: SignatureDetailItem<number>) => {
			if (!props) {
				return;
			}
			setId(item.data);
		},
		[props],
	);

	if (!props) {
		return null;
	}

	return (
		<C.Modal id={CustomModalId.LuciaDeveraux}>
			<BoardSelectModal {...props} value={id} onChange={onChange} />
		</C.Modal>
	);
};
