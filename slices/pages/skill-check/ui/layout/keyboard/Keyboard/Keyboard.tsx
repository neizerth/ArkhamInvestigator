import { cancelShowRevealModal } from "@features/chaos-bag";
import { PrimaryButton } from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import {
	addCurrentSkillCheckToHistory,
	selectHistoryShown,
	sendCommandSignal,
	sendNumberSignal,
	sendOperatorSignal,
	setHistoryShown,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckCommandType, SkillCheckOperator } from "@shared/model";
import { useCallback, useEffect } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import { characters } from "../../../../config";
import { useKeyCheck } from "../../../../lib";
import { LayoutContainer } from "../../LayoutContainer";
import * as C from "./Keyboard.components";
import { useOpenChaosBagModal } from "./hooks";
import { operatorMapping } from "./mapping";

export type KeyboardProps = ViewProps;

export const Keyboard = ({ ...props }: KeyboardProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const historyShown = useAppSelector(selectHistoryShown);
	const window = useWindowDimensions();
	const showEquals = window.height > 590;
	const showRule = window.height > 670;

	const showReveal = useOpenChaosBagModal();
	const showKeyReveal = useKeyCheck();

	const hideReveal = useCallback(() => {
		dispatch(cancelShowRevealModal());
	}, [dispatch]);

	useEffect(() => {
		return () => {
			hideReveal();
		};
	}, [hideReveal]);

	const toggleHistory = useCallback(() => {
		dispatch(setHistoryShown(!historyShown));
	}, [dispatch, historyShown]);

	const sendDigit = useCallback(
		(value: number) => () => {
			dispatch(sendNumberSignal(value));
		},
		[dispatch],
	);

	const sendOperator = useCallback(
		(value: SkillCheckOperator) => () => {
			dispatch(sendOperatorSignal(value));
		},
		[dispatch],
	);

	const sendCommand = useCallback(
		(value: SkillCheckCommandType) => () => {
			dispatch(sendCommandSignal(value));
		},
		[dispatch],
	);

	const equals = useCallback(() => {
		dispatch(addCurrentSkillCheckToHistory());
	}, [dispatch]);

	const calcAndCheck = useCallback(() => {
		equals();
		showReveal();
	}, [equals, showReveal]);

	const withDigitProps = (value: number) => {
		const baseProps = {
			onPress: sendDigit(value),
			children: value,
		};

		if (value === 0) {
			return baseProps;
		}

		return {
			...baseProps,
			onSwipeUp: showKeyReveal({
				type: "number",
				value,
			}),
			onSwipeDown: showKeyReveal({
				operator: "subtract",
				type: "number",
				value,
			}),
		};
	};

	const withOperatorProps = (value: SkillCheckOperator) => ({
		onPress: sendOperator(value),
		children: operatorMapping[value],
	});

	return (
		<C.Container {...props}>
			<C.Content border={!showRule}>
				<LayoutContainer>
					{showRule && (
						<C.Row>
							<C.Back onPress={toggleHistory}>
								<C.Rule historyShown={historyShown} />
							</C.Back>
						</C.Row>
					)}
					{!historyShown && (
						<>
							<C.StatsRow>
								<C.CustomButton
									onPress={sendCommand("clear-last")}
									onLongPress={sendCommand("clear")}
								>
									<C.Backspace />
								</C.CustomButton>
								<C.Stats />
							</C.StatsRow>
							<C.Row>
								<C.Button {...withDigitProps(7)} />
								<C.Button {...withDigitProps(8)} />
								<C.Button {...withDigitProps(9)} />
								<C.Operator {...withOperatorProps("divide")} />
							</C.Row>
							<C.Row>
								<C.Button {...withDigitProps(4)} />
								<C.Button {...withDigitProps(5)} />
								<C.Button {...withDigitProps(6)} />
								<C.Operator {...withOperatorProps("multiply")} />
							</C.Row>
							<C.Row>
								<C.Button {...withDigitProps(1)} />
								<C.Button {...withDigitProps(2)} />
								<C.Button {...withDigitProps(3)} />
								<C.Operator {...withOperatorProps("subtract")} />
							</C.Row>
							<C.Row>
								<C.Placeholder />
								<C.Button {...withDigitProps(0)} onLongPress={showReveal} />
								{showEquals ? (
									<C.Placeholder />
								) : (
									<C.Button onPress={equals} buttonType="primary">
										{characters.equals}
									</C.Button>
								)}
								<C.Operator {...withOperatorProps("add")} />
							</C.Row>
							{showEquals && (
								<PrimaryButton
									styleType="transparent"
									onPress={equals}
									onLongPress={calcAndCheck}
								>
									<C.EqualsText>{t`Equals`}</C.EqualsText>
								</PrimaryButton>
							)}
						</>
					)}
				</LayoutContainer>
			</C.Content>
		</C.Container>
	);
};
