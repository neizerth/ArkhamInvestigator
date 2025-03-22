import { goToPage, useAppDispatch, usePage } from "@shared/lib";
import type { Href } from "expo-router";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./HomeMenu.components";
import { routes } from "@shared/config";

export type HomeMenuProps = ViewProps;

export const HomeMenu = (props: HomeMenuProps) => {
	const goTo = usePage();

	return (
		<C.Container {...props}>
			<C.Left>
				{/* <C.Button onPress={goTo('/news')}>
          <C.Icon icon="typejournal"/>
        </C.Button> */}
				<C.Button onPress={goTo(routes.about)}>
					<C.InfoIcon />
				</C.Button>

				<C.Button onPress={goTo(routes.support)}>
					<C.SupportIcon />
				</C.Button>
			</C.Left>
			<C.Right>
				<C.Button onPress={goTo(routes.settings)}>
					<C.Icon icon="wrench" />
				</C.Button>
			</C.Right>
		</C.Container>
	);
};
