import { routes } from "@shared/config";
import { usePage } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./HomeMenu.components";

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
					<C.Icon icon="name" />
				</C.Button>

				<C.Button onPress={goTo(routes.boardHelp)}>
					<C.Icon icon="info" />
				</C.Button>

				<C.Button onPress={goTo(routes.support)}>
					<C.Icon icon="heart" />
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
