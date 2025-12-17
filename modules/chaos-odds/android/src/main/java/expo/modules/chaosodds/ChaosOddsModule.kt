package expo.modules.chaosodds

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ChaosOddsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ChaosOdds")

    OnCreate {
      installJSI()
    }
  }

  private fun installJSI() {
    try {
      System.loadLibrary("chaos-odds")
      nativeInstall()
    } catch (e: Throwable) {
      e.printStackTrace()
    }
  }

  private external fun nativeInstall()
}
