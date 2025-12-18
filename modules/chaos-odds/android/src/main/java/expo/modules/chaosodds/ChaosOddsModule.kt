package expo.modules.chaosodds

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ChaosOddsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ChaosOdds")
    
    // JSI bindings are installed via ChaosOddsJSIModulePackage
    // This Expo Module is only for JS API if needed
    // DO NOT install JSI here - it must be done in JSIModulePackage
  }
}
