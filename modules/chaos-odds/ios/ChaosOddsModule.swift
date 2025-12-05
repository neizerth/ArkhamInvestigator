import ExpoModulesCore

public class ChaosOddsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ChaosOdds")
    
    // Dummy function to keep the module registered
    Function("isAvailable") {
      return true
    }
  }
}
