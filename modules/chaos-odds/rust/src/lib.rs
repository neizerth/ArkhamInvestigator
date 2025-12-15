pub mod config;
pub mod get_chaos_bag_modifiers;
mod r#impl;
pub mod types;
pub mod util;

pub use get_chaos_bag_modifiers::get_chaos_bag_modifiers;
pub use types::ChaosOddsToken;
pub use util::memory::memory_free_string;
pub use util::parse::{parse_tokens, parse_tokens_json, serialize_matrix};

// Re-export public functions
pub use chaos_odds_calculate::calculate_odds;
pub use chaos_odds_calculate::chaos_odds_calculate;

mod chaos_odds_calculate;
