package expo.modules.chaosodds

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl

class ChaosOddsJSIModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ChaosOddsJSI"
    }

    init {
        System.loadLibrary("chaos-odds")
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun install(): Boolean {
        return try {
            val jsContext = reactApplicationContext.javaScriptContextHolder
            if (jsContext != null) {
                nativeInstall(jsContext.get())
                true
            } else {
                false
            }
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    private external fun nativeInstall(jsiRuntimePointer: Long)

    companion object {
        init {
            try {
                System.loadLibrary("chaos-odds")
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}

