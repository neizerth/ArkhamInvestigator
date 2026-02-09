package expo.modules.chaosodds

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.common.annotations.FrameworkAPI

/**
 * Lifecycle-aware NativeModule that tracks ReactApplicationContext destruction
 * and resets installation flags for cleanup (synchronous pattern doesn't need lifecycle tracking)
 */
class ChaosOddsLifecycleModule(reactContext: ReactApplicationContext) : BaseJavaModule() {
    
    init {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsLifecycleModule created")
    }
    
    override fun getName(): String {
        return "ChaosOddsLifecycle"
    }
    
    @OptIn(FrameworkAPI::class)
    override fun onCatalystInstanceDestroy() {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsLifecycleModule.onCatalystInstanceDestroy called")
        // Reset installation flags when ReactApplicationContext is destroyed
        // Synchronous pattern doesn't need lifecycle tracking, but we reset flags for cleanup
        ChaosOddsJSIModulePackage.markRuntimeDead()
        super.onCatalystInstanceDestroy()
    }
    
    @OptIn(FrameworkAPI::class)
    override fun invalidate() {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsLifecycleModule.invalidate called")
        // Also reset flags on invalidate
        ChaosOddsJSIModulePackage.markRuntimeDead()
        super.invalidate()
    }
}
