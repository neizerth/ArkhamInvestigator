pub mod config;
mod r#impl;
pub mod modifiers;
pub mod token_odds;
pub mod types;
pub mod util;

pub use modifiers::get_chaos_bag_modifiers;
pub use types::{ChaosOddsToken, TokenTarget};
pub use util::memory::memory_free_string;
pub use util::parse::{parse_tokens, parse_tokens_json, serialize_matrix};

// Re-export public functions
pub use chaos_odds_calculate::chaos_odds_calculate;
pub use chaos_odds_find_tokens::chaos_odds_find_tokens;
pub use odds::calculate_odds;
pub use token_odds::get_token_odds;
pub use util::cancel::chaos_odds_cancel;

mod chaos_odds_calculate;
mod chaos_odds_find_tokens;
pub mod odds;
