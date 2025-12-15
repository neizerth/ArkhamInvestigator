#include "memory_manager.h"
#include "ffi_declarations.h"
#include <atomic>
#include <mutex>
#include <unordered_map>

namespace chaosodds {
namespace memory {

// Map to store pointers returned from Rust for later freeing
// Key: unique ID (uint64_t)
// Value: original pointer from Rust
static std::unordered_map<uint64_t, const char*> g_string_pointers;
static std::mutex g_string_pointers_mutex;
static std::atomic<uint64_t> g_next_id{1}; // Start from 1, 0 is reserved for null/invalid

uint64_t generate_id() {
    return g_next_id.fetch_add(1, std::memory_order_relaxed);
}

void store_pointer(uint64_t id, const char* ptr) {
    std::lock_guard<std::mutex> lock(g_string_pointers_mutex);
    g_string_pointers[id] = ptr;
}

bool free_pointer_by_id(uint64_t id) {
    if (id == 0) {
        return false;
    }

    std::lock_guard<std::mutex> lock(g_string_pointers_mutex);
    auto it = g_string_pointers.find(id);
    if (it != g_string_pointers.end()) {
        const char* ptr = it->second;
        memory_free_string(ptr);
        g_string_pointers.erase(it);
        return true;
    }
    return false;
}

} // namespace memory
} // namespace chaosodds

