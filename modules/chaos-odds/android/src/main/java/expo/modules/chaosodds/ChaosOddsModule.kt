package expo.modules.chaosodds

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ChaosOddsModule : Module() {
  // JSI bindings are installed by ChaosOddsJSIModule
  // This module is kept for Expo module system compatibility but is not used
  override fun definition() = ModuleDefinition {
    Name("ChaosOdds")
    
    // Dummy function to keep the module registered
    Function("isAvailable") {
      true
    }
  }
}
