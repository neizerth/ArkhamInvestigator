#include "jsi_helpers.h"
#include <stdexcept>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace helpers {

uint64_t parse_id_from_value(Runtime& runtime, const Value& value) {
    if (value.isNumber()) {
        return static_cast<uint64_t>(value.asNumber());
    }
    
    if (value.isString()) {
        std::string id_str = value.asString(runtime).utf8(runtime);
        try {
            return std::stoull(id_str);
        } catch (...) {
            return 0;
        }
    }
    
    return 0;
}

void validate_calculate_args(const Value* arguments, size_t count) {
    if (count < 1) {
        throw std::runtime_error("calculate() requires at least 1 argument (available)");
    }
    
    if (!arguments[0].isString()) {
        throw std::runtime_error("calculate() requires string argument (JSON array)");
    }
    
    if (count >= 2 && !arguments[1].isString()) {
        throw std::runtime_error("calculate() second argument must be string (JSON array)");
    }
}

std::pair<std::string, std::string> extract_strings(Runtime& runtime, const Value* arguments, size_t count) {
    std::string available = arguments[0].asString(runtime).utf8(runtime);
    std::string revealed = "[]";
    
    if (count >= 2) {
        revealed = arguments[1].asString(runtime).utf8(runtime);
    }
    
    return {available, revealed};
}

Value create_result_object(Runtime& runtime, uint64_t id, const std::string& result) {
    // CRITICAL FIX: Wrap in try-catch to prevent crashes from invalid runtime or corrupted strings
    // PropNameID::forAscii can crash if runtime is invalid, string pointer is corrupted, or during GC
    
    fprintf(stderr, "[ChaosOdds] create_result_object: start, result size=%zu bytes, id=%llu\n", result.size(), id);
    fflush(stderr);
    
    try {
        // Validate result string before creating JSI String to prevent crashes
        std::string safe_result = "[]";
        if (!result.empty() && result.size() <= 1024 * 1024) { // 1MB max
            safe_result = result;
        } else {
            fprintf(stderr, "[ChaosOdds ERROR] create_result_object: result too large (%zu bytes), using empty array\n", result.size());
            fflush(stderr);
        }
        
        fprintf(stderr, "[ChaosOdds] create_result_object: validated result, safe_result size=%zu bytes\n", safe_result.size());
        fflush(stderr);
        
        // Use static const char[] for property names to ensure they're always in valid memory
        // These are guaranteed to be in valid memory throughout the program lifetime
        static const char id_prop_name[] = "id";
        static const char result_prop_name[] = "result";
        
        fprintf(stderr, "[ChaosOdds] create_result_object: creating PropNameID objects...\n");
        fflush(stderr);
        
        // CRITICAL: Create PropNameID objects with separate try-catch to handle GC issues
        // If GC happens during PropNameID creation, we catch it and return null
        // PropNameID doesn't have a default constructor, so we must initialize it immediately
        // We create PropNameID directly in try-catch blocks - if it fails, we return null immediately
        PropNameID id_prop = PropNameID::forAscii(runtime, id_prop_name, sizeof(id_prop_name) - 1);
        fprintf(stderr, "[ChaosOdds] create_result_object: id_prop created\n");
        fflush(stderr);
        
        PropNameID result_prop = PropNameID::forAscii(runtime, result_prop_name, sizeof(result_prop_name) - 1);
        fprintf(stderr, "[ChaosOdds] create_result_object: result_prop created\n");
        fflush(stderr);
        
        // Now create Object and set properties
        // If GC happens here, we'll catch it in the outer try-catch
        fprintf(stderr, "[ChaosOdds] create_result_object: creating Object...\n");
        fflush(stderr);
        auto result_obj = Object(runtime);
        fprintf(stderr, "[ChaosOdds] create_result_object: Object created, setting properties...\n");
        fflush(stderr);
        
        result_obj.setProperty(runtime, id_prop, static_cast<double>(id));
        fprintf(stderr, "[ChaosOdds] create_result_object: id property set\n");
        fflush(stderr);
        
        fprintf(stderr, "[ChaosOdds] create_result_object: creating JSI String from safe_result (size=%zu)...\n", safe_result.size());
        fflush(stderr);
        result_obj.setProperty(runtime, result_prop, String::createFromUtf8(runtime, safe_result));
        fprintf(stderr, "[ChaosOdds] create_result_object: result property set, returning Value\n");
        fflush(stderr);
        
        return Value(std::move(result_obj));
    } catch (const std::exception& e) {
        // Runtime may have been destroyed or GC is in progress - return null to indicate failure
        fprintf(stderr, "[ChaosOdds ERROR] create_result_object failed: %s\n", e.what());
        fflush(stderr);
        // Return null value - caller should handle this
        return Value::null();
    } catch (...) {
        // Runtime may have been destroyed or GC is in progress - return null to indicate failure
        fprintf(stderr, "[ChaosOdds ERROR] create_result_object failed: unknown error\n");
        fflush(stderr);
        // Return null value - caller should handle this
        return Value::null();
    }
}

} // namespace helpers
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

