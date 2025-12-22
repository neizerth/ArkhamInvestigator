import {
	selectCompletedChaosOddsPerformanceTests,
	setCompletedChaosOddsPerformanceTests,
} from "@modules/chaos-bag/odds/shared/lib";
import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { Text, defaultTableRenderData } from "@shared/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { headers, testGroups } from "../config";
import { useRunChaosOddsTest } from "../lib";
import * as C from "./ChaosOddsPerformancePage.components";
import {
	cellStyle,
	cellTextStyle,
	columnStyles,
	formatDuration,
	headerStyle,
} from "./ChaosOddsPerformancePage.style";

export const ChaosOddsPerformancePage = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [autoRun, setAutoRun] = useBoolean(true);
	const completedTests = useAppSelector(
		selectCompletedChaosOddsPerformanceTests,
	);

	const run = useRunChaosOddsTest();

	const clear = useCallback(() => {
		dispatch(setCompletedChaosOddsPerformanceTests({}));
	}, [dispatch]);

	const data = useMemo(() => {
		const completed = completedTests ?? {};

		return testGroups.map(({ group, tests }, index) => {
			return [
				group.id,
				...tests.map(({ id }) => {
					const value = completed[id];
					const onPress = () => run(id);

					if (!value) {
						return <C.Run key={id} icon="play3" onPress={onPress} />;
					}
					return (
						<C.Result key={id} onPress={onPress}>
							<Text>{formatDuration(value)}</Text>
						</C.Result>
					);
				}),
			];
		});
	}, [completedTests, run]);
	return (
		<C.Page title="chaosOdds.performance.pageTitle">
			<C.Content>
				<Text>{t`chaosOdds.performance.description`}</Text>

				<C.AutoRun
					label={t`chaosOdds.performance.autoRun`}
					onPress={setAutoRun.toggle}
					checked={autoRun}
				/>
				<C.List
					data={data}
					headers={headers}
					renderData={defaultTableRenderData}
					columnStyles={columnStyles}
					headerStyle={headerStyle}
					cellStyle={cellStyle}
					cellTextStyle={cellTextStyle}
				/>
				<C.Clear
					text={t`chaosOdds.performance.clearTests`}
					icon="trash"
					onPress={clear}
				/>
			</C.Content>
		</C.Page>
	);
};
