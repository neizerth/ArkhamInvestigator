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
    // PropNameID::forUtf8 is used instead of forAscii for better compatibility with RN 0.79+ Hermes
    
    try {
        auto result_obj = Object(runtime);
        
        // Validate result string before creating JSI String to prevent crashes
        std::string safe_result = "[]";
        if (!result.empty() && result.size() <= 1024 * 1024) { // 1MB max
            safe_result = result;
        }
        
        // Use static const char[] for property names to ensure they're always in valid memory
        // These are guaranteed to be in valid memory throughout the program lifetime
        static const char id_prop_name[] = "id";
        static const char result_prop_name[] = "result";
        
        // Use PropNameID::forUtf8 instead of forAscii for better compatibility with RN 0.79+ Hermes
        // This prevents ABI issues that can cause crashes in Hermes
        PropNameID id_prop = PropNameID::forUtf8(runtime, id_prop_name);
        PropNameID result_prop = PropNameID::forUtf8(runtime, result_prop_name);
        
        result_obj.setProperty(runtime, id_prop, static_cast<double>(id));
        result_obj.setProperty(runtime, result_prop, String::createFromUtf8(runtime, safe_result));
        
        return Value(std::move(result_obj));
    } catch (...) {
        // If everything fails, return a minimal object using string literals directly
        // This is a last resort fallback
        auto result_obj = Object(runtime);
        result_obj.setProperty(runtime, "id", static_cast<double>(id));
        result_obj.setProperty(runtime, "result", String::createFromUtf8(runtime, "[]"));
        return Value(std::move(result_obj));
    }
}

} // namespace helpers
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

