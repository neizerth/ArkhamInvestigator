import { BlessCurseCount } from "@modules/chaos-bag/base/entities/ui/BlessCurseCount";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import {
	selectModalData,
	setModalValue,
} from "@modules/core/modal/shared/base/lib";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./ParallelWendyAdamsModal.components";
import { useData } from "./useData";

export const ParallelWendyAdamsModal = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(
		selectModalData,
	) as BaseModalData<BaseModalAction> | null;

	const { t } = useTranslation();

	const { count, bless, curse } = useData();

	useEffect(() => {
		dispatch(setModalValue(count));
	}, [count, dispatch]);

	if (!data) {
		return;
	}

	return (
		<C.Modal id={CustomModalId.ParallelWendyAdams}>
			<C.Confirm data={data}>
				<C.Content>
					<C.Text value={t`ability.wendy.parallel.elderSign.text`} />
					<BlessCurseCount
						onBlessPress={bless.add}
						onBlessLongPress={bless.remove}
						onCursePress={curse.add}
						onCurseLongPress={curse.remove}
						available
					/>
					{count.total > 0 && (
						<C.SelectedContent>
							<C.SelectedTitle>
								{t`ability.wendy.parallel.elderSign.selected.title`}
							</C.SelectedTitle>
							<C.Rule />
							<C.List>
								{range(0, count.bless).map((index) => (
									<C.Button key={index} onPress={bless.remove}>
										<C.Token type="bless" />
									</C.Button>
								))}
								{range(0, count.curse).map((index) => (
									<C.Button key={index} onPress={curse.remove}>
										<C.Token type="curse" />
									</C.Button>
								))}
							</C.List>
							<C.Text
								value={t`ability.wendy.parallel.elderSign.selected.text`}
							/>
						</C.SelectedContent>
					)}
				</C.Content>
			</C.Confirm>
		</C.Modal>
	);
};
