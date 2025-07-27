import type React from "react";
import { Fragment } from "react";
import type { TextProps, ViewProps } from "react-native";

import { v4 } from "uuid";
import * as C from "../ui/GameText/GameText.components";
import { getTokens } from "./getTokens";

type Options = {
	children: React.ReactNode[];
	style?: TextProps["style"];
	tokenStyle?: ViewProps["style"];
	props: object;
	breakSentence?: boolean;
};
export function getNodeContents({
	children,
	style,
	props,
	breakSentence,
	tokenStyle,
}: Options) {
	return children.map((child) => {
		if (typeof child !== "string") {
			if (Array.isArray(child)) {
				const children = getNodeContents({
					children: child,
					style,
					props,
					breakSentence,
					tokenStyle,
				});

				return <Fragment key={v4()}>{children}</Fragment>;
			}
			return <Fragment key={v4()}>{child}</Fragment>;
		}

		const tokens = getTokens({
			text: child,
			breakSentence,
		});

		return (
			<Fragment key={v4()}>
				{tokens.map((token) => (
					<C.Token key={v4()} style={tokenStyle}>
						<C.Text {...props} style={style}>
							{token}
						</C.Text>
					</C.Token>
				))}
			</Fragment>
		);
	});
}
