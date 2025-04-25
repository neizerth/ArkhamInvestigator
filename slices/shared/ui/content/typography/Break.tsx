import {
	UnscaledText,
	type UnscaledTextProps,
} from "../../behavior/UnscaledText";
export type BreakProps = UnscaledTextProps;

export const Break = (props: BreakProps) => {
	return <UnscaledText {...props}>{"\n"}</UnscaledText>;
};
