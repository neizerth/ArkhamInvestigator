import {
	selectCurrentActualPropValue,
	selectCurrentBoardProp,
} from "@modules/board/base/shared/lib";
import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useModal } from "@modules/core/modal/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import {
	changeInvestigatorDetails,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useEffect, useState } from "react";

// Hank Samson ability
export const useChangeInvestigatorAfterDefeat = (codes: string[]) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const faction = useAppSelector(selectCurrentFaction);
	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const health = useAppSelector(selectCurrentActualPropValue("health"));
	const sanity = useAppSelector(selectCurrentActualPropValue("sanity"));

	const defeated = health === 0 || sanity === 0;

	const trackChanges = investigator?.code && codes.includes(investigator?.code);

	const [shown, setShown] = useState(false);

	const onOk = useCallback(() => {
		dispatch(changeInvestigatorDetails());
	}, [dispatch]);

	const [showModal] = useModal({
		id: "change-investigator-after-defeat",
		data: {
			type: "faction",
			faction,
			contentType: "text",
			title: t`Defeated`,
			okText: t`Change`,
			cancelText: t`Cancel`,
			text: t`defeat.modal.text`,
		},
		onOk,
	});

	useEffect(() => {
		if (!defeated && shown) {
			setShown(false);
			return;
		}
		if (!trackChanges || !defeated || shown) {
			return;
		}
		showModal();
		setShown(true);
	}, [trackChanges, defeated, showModal, shown]);
};
