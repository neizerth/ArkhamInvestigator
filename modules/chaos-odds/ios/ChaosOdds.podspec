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

  s.dependency 'ExpoModulesCore'
  s.dependency 'React-Core'

  # Swift/Objective-C/C++ compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    'CLANG_CXX_LIBRARY' => 'libc++'
  }

  s.source_files = "**/*.{h,m,mm,swift,cpp}"
  s.public_header_files = "ChaosOddsJSIModule.h", "ChaosOddsJSIInstaller.h"

  s.vendored_frameworks = 'chaos_odds.xcframework'
  
  s.libraries = 'c++'
  s.frameworks = 'Foundation', 'Security'
end
