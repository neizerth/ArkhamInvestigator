import { openReferenceCard } from "@entities/reference-card";
import { usePage } from "@modules/core/router/shared/lib";
import { selectTimingRules } from "@modules/mechanics/rules/round-timing/shared/lib";
import { selectSkillTestReferenceTitle } from "@modules/mechanics/rules/skill-test-timing/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./RevealMenu.components";

export type RevealMenuProps = ViewProps;

export const RevealMenu = (props: RevealMenuProps) => {
	const [open, setOpen] = useBoolean(false);
	const dispatch = useAppDispatch();
	const timingRules = useAppSelector(selectTimingRules);
	const skillTestTitle = useAppSelector(selectSkillTestReferenceTitle);
	const { t } = useTranslation();

	const goTo = usePage();

	const gotoReference = useCallback(() => {
		dispatch(
			openReferenceCard({
				returnToRevealModal: "yes",
			}),
		);
	}, [dispatch]);

	const icon = open ? "plus" : "menu";

	return (
		<C.Container {...props}>
			<C.Toggle onPress={setOpen.toggle} open={open}>
				<C.ToggleIcon icon={icon} open={open} />
			</C.Toggle>
			{open && (
				<C.Menu>
					<C.MenuItem onPress={gotoReference} first>
						<C.MenuLabel>{t`Scenario Reference`}</C.MenuLabel>
						<C.MenuIcon icon="list2" />
					</C.MenuItem>
					<C.MenuItem
						onPress={goTo({
							pathname: routes.roundReference,
							params: {
								returnToRevealModal: "yes",
							},
						})}
					>
						<C.MenuLabel>{timingRules?.title}</C.MenuLabel>
						<C.MenuIcon icon="stopwatch" />
					</C.MenuItem>
					<C.MenuItem
						onPress={goTo({
							pathname: routes.skillTestReference,
							params: {
								returnToRevealModal: "yes",
							},
						})}
					>
						<C.MenuLabel>{skillTestTitle}</C.MenuLabel>
						<C.MenuIcon icon="wild" />
					</C.MenuItem>
					<C.MenuItem onPress={goTo(routes.boardHelp)}>
						<C.MenuLabel>{t`Help`}</C.MenuLabel>
						<C.MenuIcon icon="info" />
					</C.MenuItem>
					<C.MenuItem onPress={goTo(routes.settings)} last>
						<C.MenuLabel>{t`Settings`}</C.MenuLabel>
						<C.MenuIcon icon="wrench" />
					</C.MenuItem>
				</C.Menu>
			)}
		</C.Container>
	);
};
