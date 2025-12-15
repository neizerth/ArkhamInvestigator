pub mod config;
mod r#impl;
pub mod modifiers;
pub mod types;
pub mod util;

pub use modifiers::get_chaos_bag_modifiers;
pub use types::ChaosOddsToken;
pub use util::memory::memory_free_string;
pub use util::parse::{parse_tokens, parse_tokens_json, serialize_matrix};

// Re-export public functions
pub use chaos_odds_calculate::chaos_odds_calculate;
pub use odds::calculate_odds;
pub use util::cancel::chaos_odds_cancel;

mod chaos_odds_calculate;
pub mod odds;
