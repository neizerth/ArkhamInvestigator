package expo.modules.chaosodds

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.JavaScriptContextHolder
import com.facebook.react.common.annotations.FrameworkAPI
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl
import java.io.File

/**
 * ReactPackage для установки JSI bindings
 * Устанавливает JSI bindings рано в процессе инициализации React Native,
 * до того как JS код начинает выполняться
 * 
 * В React Native 0.79+ JSIModulePackage недоступен,
 * поэтому используется ReactPackage как альтернатива
 */
class ChaosOddsJSIModulePackage : ReactPackage {

    init {
        Log.i("ChaosOdds", "🔵 ChaosOddsJSIModulePackage CREATED")
    }

    companion object {
        @Volatile
        private var libraryLoaded = false
        
        @Volatile
        private var bindingsInstalled = false
        
        // Handler for periodic retry attempts
        private var retryHandler: android.os.Handler? = null
        private var retryRunnable: Runnable? = null
        
        @Synchronized
        fun ensureLibraryLoaded(context: android.content.Context) {
            if (libraryLoaded) {
                return
            }
            try {
                Log.i("ChaosOdds", "🔵 [Kotlin] Loading native library chaos_odds")
                
                // With proper CMake linking via ReactAndroid prefab targets,
                // JSI symbols are linked at build time, so we just need to load our library.
                // React Native libraries are already loaded by the app.
                try {
                    com.facebook.soloader.SoLoader.loadLibrary("chaos_odds")
                    libraryLoaded = true
                    Log.i("ChaosOdds", "✅ [Kotlin] Native library loaded via SoLoader")
                } catch (e: Throwable) {
                    try {
                        System.loadLibrary("chaos_odds")
                        libraryLoaded = true
                        Log.i("ChaosOdds", "✅ [Kotlin] Native library loaded via System.loadLibrary")
                    } catch (e2: Throwable) {
                        Log.e("ChaosOdds", "❌ [Kotlin] Failed to load native library", e2)
                        throw e2
                    }
                }
                
                Log.i("ChaosOdds", "✅ [Kotlin] libchaos_odds.so loaded successfully")
            } catch (e: Throwable) {
                Log.e("ChaosOdds", "❌ [Kotlin] All methods failed to load native library", e)
                e.printStackTrace()
                // Don't set libraryLoaded = true, so we can retry later
            }
        }
        
        // Function to mark runtime as dead when ReactApplicationContext is invalidated
        // Synchronous pattern doesn't need lifecycle tracking, but we reset flags for cleanup
        @JvmStatic
        @OptIn(FrameworkAPI::class)
        fun markRuntimeDead() {
            Log.i("ChaosOdds", "🔵 [Kotlin] markRuntimeDead called (no-op in synchronous pattern)")
            try {
                // Call JNI function - it's now a no-op that just resets installation flag
                nativeMarkRuntimeDead()
                bindingsInstalled = false // Reset flag to allow re-installation
                
                // Stop periodic retry checks when runtime is dead
                retryRunnable?.let { runnable ->
                    retryHandler?.removeCallbacks(runnable)
                }
                retryRunnable = null
                retryHandler = null
                Log.i("ChaosOdds", "✅ [Kotlin] Installation flags reset")
            } catch (e: Throwable) {
                Log.e("ChaosOdds", "❌ [Kotlin] Failed to reset flags", e)
            }
        }
        
        @JvmStatic
        @OptIn(FrameworkAPI::class)
        private external fun nativeMarkRuntimeDead()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsJSIModulePackage.createNativeModules CALLED")
        
        // Reset flags on each app start to handle force kill scenarios
        // Synchronous pattern doesn't need lifecycle tracking, but we reset flags for cleanup
        Log.i("ChaosOdds", "🔵 [Kotlin] Resetting installation flags for new app session")
        bindingsInstalled = false
        try {
            // Also reset native flag to ensure clean state
            nativeMarkRuntimeDead()
        } catch (e: Throwable) {
            Log.w("ChaosOdds", "⚠️ [Kotlin] Failed to reset native flags (may be first launch): ${e.message}")
        }
        
        // CRITICAL: Install JSI bindings on JS queue thread, not NativeModules queue
        // JSI runtime is only valid on JS thread - installing on wrong thread causes SIGSEGV
        // This happens early in React Native initialization, before JS code runs
        reactContext.runOnJSQueueThread {
            installJSIBindings(reactContext)
        }
        
        // Set up periodic retry mechanism - check every 5 seconds if bindings are not installed
        // This ensures installation eventually succeeds even if initial attempts fail
        retryHandler = android.os.Handler(android.os.Looper.getMainLooper())
        retryRunnable = object : Runnable {
            override fun run() {
                if (!bindingsInstalled) {
                    Log.i("ChaosOdds", "🔄 [Kotlin] Periodic check: bindings not installed, retrying...")
                    reactContext.runOnJSQueueThread {
                        installJSIBindings(reactContext, 0)  // Reset retry count for periodic attempts
                    }
                }
                // Schedule next check in 5 seconds
                retryHandler?.postDelayed(this, 5000L)
            }
        }
        // Start periodic checks after initial delay
        retryRunnable?.let { runnable ->
            retryHandler?.postDelayed(runnable, 5000L)
        }
        
        // Return a lifecycle-aware NativeModule to reset flags on context destruction
        // Synchronous pattern doesn't need lifecycle tracking, but we reset flags for cleanup
        return listOf(ChaosOddsLifecycleModule(reactContext))
    }
    
    @OptIn(FrameworkAPI::class)
    private fun installJSIBindings(reactContext: ReactApplicationContext, retryCount: Int = 0) {
        // Increased max retries to allow more attempts - installation can fail temporarily
        // but should eventually succeed when runtime is fully ready
        val maxRetries = 30  // Allow up to 30 retries (about 30 seconds total with exponential backoff)
        val baseDelayMs = 100L
        val maxDelayMs = 2000L  // Cap delay at 2 seconds
        
        try {
            Log.i("ChaosOdds", "🔵 [Kotlin] installJSIBindings attempt #${retryCount + 1}")
            
            // NOTE: We don't check hasActiveCatalystInstance() here because:
            // 1. It may return false even when context is valid in RN 0.79+
            // 2. Runtime validation in C++ code is more reliable
            // 3. We rely on runtime pointer validation instead
            
            // CRITICAL: Load library HERE, when runtime is ready
            // This ensures that libreactnativejni.so is fully loaded and initialized
            // By this time, React Native has loaded all its libraries with proper flags
            // We load it here instead of createNativeModules to ensure all React Native
            // libraries are fully initialized and their symbols are available
            if (!libraryLoaded) {
                Log.i("ChaosOdds", "🔵 [Kotlin] Library not loaded yet, loading now...")
                ensureLibraryLoaded(reactContext)
            }
            
            // Double-check that library is loaded
            if (!libraryLoaded) {
                Log.e("ChaosOdds", "❌ [Kotlin] Library failed to load, cannot install JSI bindings")
                if (retryCount < maxRetries) {
                    val delay = (baseDelayMs * (1 shl retryCount.coerceAtMost(5))).coerceAtMost(maxDelayMs)
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying library load in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                } else {
                    Log.e("ChaosOdds", "❌ [Kotlin] Max retries reached for library load - will continue retrying with longer interval")
                    // Continue retrying with fixed delay after max retries
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount)  // Keep same retry count
                    }, maxDelayMs)
                }
                return
            }
            
            // Access JavaScriptContextHolder - if context is destroyed, this will be null
            // Runtime validation will happen in C++ code which is more reliable
            val jsContextHolder: JavaScriptContextHolder? = reactContext.javaScriptContextHolder
            if (jsContextHolder == null) {
                Log.w("ChaosOdds", "⚠️ [Kotlin] JavaScriptContextHolder is null (attempt #${retryCount + 1})")
                if (retryCount < maxRetries) {
                    val delay = (baseDelayMs * (1 shl retryCount.coerceAtMost(5))).coerceAtMost(maxDelayMs)
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                } else {
                    Log.w("ChaosOdds", "⚠️ [Kotlin] Max retries reached for JavaScriptContextHolder - will continue retrying")
                    // Continue retrying with fixed delay after max retries
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount)  // Keep same retry count
                    }, maxDelayMs)
                }
                return
            }
            
            val runtimePtr = jsContextHolder.get()
            Log.i("ChaosOdds", "🔵 [Kotlin] runtimePtr = $runtimePtr (attempt #${retryCount + 1})")
            
            if (runtimePtr == 0L) {
                Log.w("ChaosOdds", "⚠️ [Kotlin] Runtime pointer is 0 - runtime not ready yet (attempt #${retryCount + 1})")
                if (retryCount < maxRetries) {
                    val delay = (baseDelayMs * (1 shl retryCount.coerceAtMost(5))).coerceAtMost(maxDelayMs)
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                } else {
                    Log.w("ChaosOdds", "⚠️ [Kotlin] Max retries reached for runtime pointer - will continue retrying")
                    // Continue retrying with fixed delay after max retries
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount)  // Keep same retry count
                    }, maxDelayMs)
                }
                return
            }
            
            // CRITICAL: Check if bindings are already installed
            // This prevents multiple installations which can cause SIGSEGV
            if (bindingsInstalled) {
                Log.i("ChaosOdds", "⚠️ [Kotlin] JSI bindings already installed, skipping")
                return
            }
            
            // Runtime is ready - install JSI bindings
            // Runtime validation will happen in C++ code (ChaosOddsJNI.cpp) which is more reliable
            Log.i("ChaosOdds", "✅ [Kotlin] Runtime is ready (runtimePtr=$runtimePtr), calling nativeInstall")
            
            // Get CallInvoker for async operations
            var callInvokerHolder: com.facebook.react.turbomodule.core.CallInvokerHolderImpl? = null
            try {
                callInvokerHolder = reactContext.catalystInstance.jsCallInvokerHolder as? com.facebook.react.turbomodule.core.CallInvokerHolderImpl
                if (callInvokerHolder != null) {
                    Log.i("ChaosOdds", "✅ [Kotlin] CallInvokerHolder obtained")
                } else {
                    Log.w("ChaosOdds", "⚠️ [Kotlin] CallInvokerHolder is null - async operations may not work")
                }
            } catch (e: Throwable) {
                Log.w("ChaosOdds", "⚠️ [Kotlin] Failed to get CallInvokerHolder", e)
                // Continue without CallInvoker - installation will still work
            }
            
            // CRITICAL: Mark bindings as installing before calling nativeInstall
            // This prevents concurrent installation attempts
            // Runtime validation happens in C++ code which is more reliable
            synchronized(this) {
                if (bindingsInstalled) {
                    Log.i("ChaosOdds", "⚠️ [Kotlin] JSI bindings were installed concurrently, skipping")
                    return
                }
                
                try {
                    nativeInstall(runtimePtr, callInvokerHolder)
                    bindingsInstalled = true
                    Log.i("ChaosOdds", "✅ [Kotlin] nativeInstall completed successfully, bindings marked as installed")
                    
                    // Stop periodic retry checks once installation succeeds
                    retryRunnable?.let { runnable ->
                        retryHandler?.removeCallbacks(runnable)
                    }
                    retryRunnable = null
                } catch (e: Throwable) {
                    Log.e("ChaosOdds", "❌ [Kotlin] nativeInstall threw exception (attempt #${retryCount + 1})", e)
                    e.printStackTrace()
                    // Reset bindingsInstalled flag to allow retry
                    bindingsInstalled = false
                    // Don't mark as installed on failure, so we can retry
                    throw e
                }
            }
            Log.i("ChaosOdds", "✅ [Kotlin] JSI bindings installation attempt completed")
            
        } catch (e: Throwable) {
            Log.e("ChaosOdds", "❌ [Kotlin] Exception in installJSIBindings (attempt #${retryCount + 1})", e)
            e.printStackTrace()
            
            // Always retry on exception - installation must succeed eventually
            // Use exponential backoff up to maxDelayMs, then continue with fixed delay
            val delay = if (retryCount < maxRetries) {
                (baseDelayMs * (1 shl retryCount.coerceAtMost(5))).coerceAtMost(maxDelayMs)
            } else {
                maxDelayMs  // Fixed delay after max retries
            }
            
            Log.i("ChaosOdds", "⏳ [Kotlin] Retrying after exception in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})")
            android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                // Reset bindingsInstalled flag before retry to ensure we can try again
                bindingsInstalled = false
                installJSIBindings(reactContext, if (retryCount < maxRetries) retryCount + 1 else retryCount)
            }, delay)
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    @OptIn(FrameworkAPI::class)
    private external fun nativeInstall(runtimePtr: Long, callInvokerHolder: com.facebook.react.turbomodule.core.CallInvokerHolderImpl?)
}

