import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import type { FlatListProps } from "react-native";

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
	data?: ChaosTokenValues;
};
