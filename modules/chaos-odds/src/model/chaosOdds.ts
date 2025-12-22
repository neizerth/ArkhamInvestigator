// Model types for chaos odds module

export interface ChaosOddsTokenInput {
	token_type: string;
	value: number;
	is_fail: boolean;
	is_success: boolean;
	reveal_count: number;
}

export interface ChaosOddsFindTokenTarget {
	token_type: string;
	min_count: number;
	max_count?: number;
}
