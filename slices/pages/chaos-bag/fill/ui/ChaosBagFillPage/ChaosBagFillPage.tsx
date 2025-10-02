import { createChaosBag } from "@modules/chaos-bag/base/entities/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { useGoBack } from "@modules/core/router/shared/lib";
import { selectStory } from "@modules/stories/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { DropdownItem } from "@shared/ui";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import * as C from "./ChaosBagFillPage.components";

export const ChaosBagFillPage = () => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
	const { t } = useTranslation();

	const levels = story?.difficultyLevels || [];

	const data = useMemo(() => {
		return levels.map((item) => ({
			label: t(item.text),
			value: item,
		}));
	}, [levels, t]);

	type Value = (typeof data)[number]["value"];

	const [value, setValue] = useState<Value | undefined>(data[0]?.value);

	const onChange = useCallback(({ value }: DropdownItem<Value>) => {
		setValue(value);
	}, []);

	const back = useGoBack();

	const tokens = useMemo(() => {
		if (!value) {
			return [];
		}
		return value.tokens.map((type) => ({
			id: v4(),
			type,
		}));
	}, [value]);

	const fill = useCallback(() => {
		const data = tokens.reduce(
			(total, item) => {
				const value = total[item.type] || 0;

				total[item.type] = value + 1;

				return total;
			},
			{} as Partial<Record<ChaosTokenType, number>>,
		);

		dispatch(
			createChaosBag({
				tokenCount: data,
			}),
		);
		back();
	}, [dispatch, back, tokens]);

	const title = story ? story.name : "Fill Chaos Bag";

	return (
		<C.Container title={title} onClose={back}>
			<C.Content>
				<C.Select
					data={data}
					onChange={onChange}
					label={t`Difficulty`}
					value={value}
				/>
				<C.Preview>
					{tokens.map((item) => (
						<C.Token key={item.id} type={item.type} />
					))}
				</C.Preview>
				<C.Actions>
					<C.Cancel text={t`Cancel`} icon="dismiss" onPress={back} />
					<C.Ok text={t`Fill`} icon="check" onPress={fill} />
				</C.Actions>
			</C.Content>
		</C.Container>
	);
};
