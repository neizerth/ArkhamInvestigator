package com.arkhaminvestigator.dev

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class HapticsSupportModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "HapticsSupport"

  private fun getVibrator(): Vibrator? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val manager = reactContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager?
      manager?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      reactContext.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator?
    }
  }

  @ReactMethod
  fun isEffectsSupported(promise: Promise) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
      promise.resolve(false); 
      return
    }
    val vibrator = getVibrator()
    if (vibrator == null) {
      promise.resolve(false)
      return
    }

    if (vibrator.hasVibrator() == false) {
      promise.resolve(false)
      return
    }

    if (vibrator.hasAmplitudeControl() == false) {
       promise.resolve(false)
      return
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val effects = intArrayOf(
        VibrationEffect.EFFECT_CLICK,
        VibrationEffect.EFFECT_DOUBLE_CLICK,
        VibrationEffect.EFFECT_HEAVY_CLICK,
        VibrationEffect.EFFECT_TICK
      )

      var allSupported = true

      for (effect in effects) {
        val support = vibrator.areEffectsSupported(effect)
        if (support != Vibrator.VIBRATION_EFFECT_SUPPORT_YES) {
          allSupported = false
          break
        }
        try {
          VibrationEffect.createPredefined(effect)
        } catch (_: Throwable) {
          allSupported = false
          break
        }
      }

      promise.resolve(allSupported)
      return
    }

    // API 29-30: guard createPredefined which may throw on some OEMs
    @Suppress("DEPRECATION")
    try {
      VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK)
      promise.resolve(true)
    } catch (_: Throwable) {
      promise.resolve(false)
    }
  }
}

