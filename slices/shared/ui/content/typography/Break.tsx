import { type AppTextProps, UnscaledText } from "../../behavior/UnscaledText";
export type BreakProps = AppTextProps;

export const Break = (props: BreakProps) => {
	return <UnscaledText {...props}>{"\n"}</UnscaledText>;
};
