#pragma once

#include <cstdint>
#include <mutex>
#include <unordered_map>

namespace chaosodds {
namespace memory {

/// Generate unique ID for pointer tracking
uint64_t generate_id();

/// Store pointer with ID for later freeing
void store_pointer(uint64_t id, const char* ptr);

/// Free pointer by ID and remove from storage
bool free_pointer_by_id(uint64_t id);

} // namespace memory
} // namespace chaosodds

