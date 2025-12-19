Pod::Spec.new do |s|
  s.name           = 'ChaosOdds'
  s.version        = '1.0.0'
  s.summary        = 'A sample project summary'
  s.description    = 'A sample project description'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.static_framework = true
  
  # Copy C++ files to ios directory for CocoaPods
  s.prepare_command = <<-CMD
    mkdir -p common
    cp -R ../cpp/common/* common/ 2>/dev/null || true
    cp ../cpp/ChaosOddsJSI.* . 2>/dev/null || true
  CMD

  s.dependency 'ExpoModulesCore'
  s.dependency 'React-Core'

  # Swift/Objective-C/C++ compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    'CLANG_CXX_LIBRARY' => 'libc++',
    'HEADER_SEARCH_PATHS' => '$(inherited) "${PODS_TARGET_SRCROOT}" "${PODS_TARGET_SRCROOT}/common" "${PODS_TARGET_SRCROOT}/../cpp" "${PODS_TARGET_SRCROOT}/../cpp/common"',
           # Force load all object files from the static library to ensure all symbols are included
           # This is necessary because iOS linker only loads .o files from static archives if there's
           # an unresolved symbol reference.
    # We force-load both architecture slices (device and simulator) to ensure symbols are available
    # Xcode will use the appropriate slice based on the build target, but we need both for universal builds
    'OTHER_LDFLAGS' => '$(inherited) -force_load "$(PODS_TARGET_SRCROOT)/chaos_odds.xcframework/ios-arm64/libchaos_odds.a" -force_load "$(PODS_TARGET_SRCROOT)/chaos_odds.xcframework/ios-arm64-simulator/libchaos_odds.a"'
  }

  s.source_files = "**/*.{h,m,mm,swift,cpp}", "common/**/*.{h,cpp}"
  s.public_header_files = "ChaosOddsJSIModule.h"

  s.vendored_frameworks = 'chaos_odds.xcframework'
  
  s.libraries = 'c++'
  s.frameworks = 'Foundation', 'Security'
end
