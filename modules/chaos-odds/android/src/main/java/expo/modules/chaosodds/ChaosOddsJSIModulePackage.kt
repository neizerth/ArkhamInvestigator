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
        
        // Return a lifecycle-aware NativeModule to reset flags on context destruction
        // Synchronous pattern doesn't need lifecycle tracking, but we reset flags for cleanup
        return listOf(ChaosOddsLifecycleModule(reactContext))
    }
    
    @OptIn(FrameworkAPI::class)
    private fun installJSIBindings(reactContext: ReactApplicationContext) {
        Log.i("ChaosOdds", "🔵 [Kotlin] installJSIBindings called")
        
        // Проверяем активность Catalyst instance, но не блокируем установку слишком рано
        // В RN 0.79+ hasActiveCatalystInstance может возвращать false даже когда Runtime готов
        val hasActiveCatalyst = try {
            reactContext.hasActiveCatalystInstance()
        } catch (e: Exception) {
            Log.w("ChaosOdds", "⚠️ Error checking hasActiveCatalystInstance: ${e.message}")
            false
        }
        
        if (!hasActiveCatalyst) {
            Log.w("ChaosOdds", "⚠️ Catalyst instance is not active, will retry...")
            // Не возвращаемся сразу - попробуем проверить Runtime pointer
        }

        val jsContextHolder = reactContext.javaScriptContextHolder
        val jsiPtr = jsContextHolder?.get() ?: 0L
        
        Log.i("ChaosOdds", "🔵 [Kotlin] Runtime pointer: $jsiPtr, hasActiveCatalyst: $hasActiveCatalyst")

        if (jsiPtr == 0L) {
            // В RN 2026/0.79+ Runtime может создаваться позже. Повторяем попытку.
            Log.w("ChaosOdds", "⏳ JSI Runtime pointer is null, retrying in 100ms...")
            android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                reactContext.runOnJSQueueThread {
                    installJSIBindings(reactContext)
                }
            }, 100)
            return
        }

        synchronized(this) {
            if (bindingsInstalled) {
                Log.i("ChaosOdds", "⚠️ [Kotlin] JSI bindings already installed, skipping")
                return
            }
            
            try {
                ensureLibraryLoaded(reactContext)
                
                // Важно: в Bridgeless CallInvoker достается иначе, 
                // но для обратной совместимости проверяем так:
                val holder = reactContext.catalystInstance.jsCallInvokerHolder
                
                if (holder == null) {
                    // Если инвокер еще не готов, ждем его
                    Log.w("ChaosOdds", "⏳ CallInvokerHolder is null, waiting 100ms...")
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        reactContext.runOnJSQueueThread {
                            installJSIBindings(reactContext)
                        }
                    }, 100)
                    return
                }

                Log.i("ChaosOdds", "🔵 [Kotlin] Calling nativeInstall with pointer: $jsiPtr")
                nativeInstall(jsiPtr, holder as CallInvokerHolderImpl)
                bindingsInstalled = true
                Log.i("ChaosOdds", "✅ [Kotlin] JSI installed successfully on pointer: $jsiPtr")
            } catch (e: Exception) {
                Log.e("ChaosOdds", "❌ [Kotlin] Installation failed: ${e.message}", e)
                e.printStackTrace()
                bindingsInstalled = false
                // Retry after delay
                android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                    reactContext.runOnJSQueueThread {
                        installJSIBindings(reactContext)
                    }
                }, 200)
            }
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    @OptIn(FrameworkAPI::class)
    private external fun nativeInstall(runtimePtr: Long, callInvokerHolder: com.facebook.react.turbomodule.core.CallInvokerHolderImpl?)
}

