package expo.modules.chaosodds

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.common.annotations.FrameworkAPI

/**
 * Lifecycle-aware NativeModule that tracks ReactApplicationContext destruction
 * and calls markRuntimeDead() to prevent SIGSEGV from using destroyed runtime
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
        // CRITICAL: Mark runtime as dead when ReactApplicationContext is destroyed
        // This prevents SIGSEGV from using destroyed runtime in JSI bindings
        ChaosOddsJSIModulePackage.markRuntimeDead()
        super.onCatalystInstanceDestroy()
    }
    
    @OptIn(FrameworkAPI::class)
    override fun invalidate() {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsLifecycleModule.invalidate called")
        // Also mark runtime as dead on invalidate
        ChaosOddsJSIModulePackage.markRuntimeDead()
        super.invalidate()
    }
}
