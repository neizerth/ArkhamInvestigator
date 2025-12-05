import ExpoModulesCore

public class ChaosOddsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ChaosOdds")
    
    // JSI bindings are installed by ChaosOddsJSIModule (Objective-C RCT module)
    // This module just provides a dummy function to keep the pod registered
    Function("isAvailable") {
      return true
    }
  }
}
