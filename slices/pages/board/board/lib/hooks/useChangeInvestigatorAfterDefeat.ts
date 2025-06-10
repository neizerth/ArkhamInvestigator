import { useAppTranslation } from "@modules/i18n/shared/lib";
import { useModal } from "@modules/modal/shared/lib";
import {
	changeInvestigatorDetails,
	selectCurrentBoardProp,
	selectCurrentFaction,
	selectCurrentStatValue,
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
	const health = useAppSelector(selectCurrentStatValue("health"));
	const sanity = useAppSelector(selectCurrentStatValue("sanity"));

	const defeated = health === 0 || sanity === 0;

	const trackChanges = codes.includes(investigator?.code);

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
