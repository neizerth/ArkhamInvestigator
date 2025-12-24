import {
	selectCompletedChaosOddsPerformanceTests,
	setCompletedChaosOddsPerformanceTests,
} from "@modules/chaos-bag/odds/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
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
	const completedTests = useAppSelector(
		selectCompletedChaosOddsPerformanceTests,
	);

	const run = useRunChaosOddsTest();

	const clear = useCallback(() => {
		dispatch(setCompletedChaosOddsPerformanceTests(null));
	}, [dispatch]);

	const data = useMemo(() => {
		const completed = completedTests ?? {};

		return testGroups.map(({ group, tests }) => {
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
				<C.Actions>
					<C.Action text={t`Clear`} icon="trash" onPress={clear} />
				</C.Actions>
				<C.List
					data={data}
					headers={headers}
					renderData={defaultTableRenderData}
					columnStyles={columnStyles}
					headerStyle={headerStyle}
					cellStyle={cellStyle}
					cellTextStyle={cellTextStyle}
				/>
			</C.Content>
		</C.Page>
	);
};
