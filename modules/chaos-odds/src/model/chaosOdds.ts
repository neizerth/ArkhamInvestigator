// Model types for chaos odds module

export interface ChaosOddsInput {
	token_type: string;
	value: number;
	is_fail: boolean;
	is_success: boolean;
	reveal_count: number;
}

export interface TokenTarget {
	token_type: string;
	count: number;
}

export interface FindTokensParams {
	reveal_count: number;
	revealed_frost_count: number;
	use_token_reveal?: boolean;
}
