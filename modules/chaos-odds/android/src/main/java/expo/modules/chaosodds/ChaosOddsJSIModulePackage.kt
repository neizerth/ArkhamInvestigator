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
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        Log.i("ChaosOdds", "🔵 [Kotlin] ChaosOddsJSIModulePackage.createNativeModules CALLED")
        
        // Install JSI bindings when ReactContext is ready
        // This happens early in React Native initialization, before JS code runs
        // We'll load the library in installJSIBindings when runtime is ready
        reactContext.runOnNativeModulesQueueThread {
            installJSIBindings(reactContext)
        }
        
        // Return empty list - we don't need any NativeModules
        // JSI bindings are installed directly
        return emptyList()
    }
    
    @OptIn(FrameworkAPI::class)
    private fun installJSIBindings(reactContext: ReactApplicationContext, retryCount: Int = 0) {
        val maxRetries = 10
        val baseDelayMs = 100L
        
        try {
            Log.i("ChaosOdds", "🔵 [Kotlin] installJSIBindings attempt #${retryCount + 1}")
            
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
                    val delay = baseDelayMs * (1 shl retryCount.coerceAtMost(5))
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying library load in ${delay}ms...")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                }
                return
            }
            
            val jsContextHolder: JavaScriptContextHolder? = reactContext.javaScriptContextHolder
            if (jsContextHolder == null) {
                Log.w("ChaosOdds", "⚠️ [Kotlin] JavaScriptContextHolder is null (attempt #${retryCount + 1})")
                if (retryCount < maxRetries) {
                    val delay = baseDelayMs * (1 shl retryCount.coerceAtMost(5)) // Exponential backoff, max 3.2s
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying in ${delay}ms...")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                } else {
                    Log.e("ChaosOdds", "❌ [Kotlin] Max retries reached - JavaScriptContextHolder still not available")
                }
                return
            }
            
            val runtimePtr = jsContextHolder.get()
            Log.i("ChaosOdds", "🔵 [Kotlin] runtimePtr = $runtimePtr (attempt #${retryCount + 1})")
            
            if (runtimePtr == 0L) {
                Log.w("ChaosOdds", "⚠️ [Kotlin] Runtime pointer is 0 - runtime not ready yet (attempt #${retryCount + 1})")
                if (retryCount < maxRetries) {
                    val delay = baseDelayMs * (1 shl retryCount.coerceAtMost(5)) // Exponential backoff, max 3.2s
                    Log.i("ChaosOdds", "⏳ [Kotlin] Retrying in ${delay}ms...")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        installJSIBindings(reactContext, retryCount + 1)
                    }, delay)
                } else {
                    Log.e("ChaosOdds", "❌ [Kotlin] Max retries reached - runtime pointer still 0")
                }
                return
            }
            
            // Runtime is ready - install JSI bindings
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
            }
            
            try {
                nativeInstall(runtimePtr, callInvokerHolder)
                Log.i("ChaosOdds", "✅ [Kotlin] nativeInstall returned successfully")
            } catch (e: Throwable) {
                Log.e("ChaosOdds", "❌ [Kotlin] nativeInstall threw exception", e)
                e.printStackTrace()
            }
            Log.i("ChaosOdds", "✅ [Kotlin] JSI bindings installation attempt completed")
            
        } catch (e: Throwable) {
            Log.e("ChaosOdds", "❌ [Kotlin] Exception in installJSIBindings (attempt #${retryCount + 1})", e)
            e.printStackTrace()
            
            // Retry on exception if we haven't exceeded max retries
            if (retryCount < maxRetries) {
                val delay = baseDelayMs * (1 shl retryCount.coerceAtMost(5))
                Log.i("ChaosOdds", "⏳ [Kotlin] Retrying after exception in ${delay}ms...")
                android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                    installJSIBindings(reactContext, retryCount + 1)
                }, delay)
            }
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    @OptIn(FrameworkAPI::class)
    private external fun nativeInstall(runtimePtr: Long, callInvokerHolder: com.facebook.react.turbomodule.core.CallInvokerHolderImpl?)
}

