// FFI exports for C++
#[no_mangle]
pub extern "C" fn chaos_odds_add(left: u64, right: u64) -> u64 {
    add(left, right)
}
