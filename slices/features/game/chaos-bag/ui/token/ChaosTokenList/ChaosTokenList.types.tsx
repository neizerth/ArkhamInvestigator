import type { FlatListProps } from "react-native";
import type { ChaosTokenType, ChaosTokensCount } from "../../../model";

export type ChaosTokenListItem =
	| {
			type: "token";
			value: ChaosTokenType;
	  }
	| {
			type: "blessCurse";
	  };

export type ChaosTokenListProps = Omit<
	FlatListProps<ChaosTokenListItem>,
	"data" | "renderItem"
> & {
	data?: ChaosTokensCount;
};
