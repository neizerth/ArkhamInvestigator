# chaos-odds

Native module for calculating chaos bag odds using **Rust + JSI via C++**

## Architecture

```
JavaScript/TypeScript → JSI (C++) → Rust (FFI)
```

## Quick Start

```bash
# Install dependencies
npm install

# Build for all platforms
npm run build

# Test
npm test
```

## Usage

```typescript
import { ChaosOdds, countChaosTokens } from 'chaos-odds';
import type { ChaosTokenInput } from 'chaos-odds';

// Call Rust function via JSI
const result = ChaosOdds.add(2, 3); // Returns 5

// Count chaos tokens
const tokens: ChaosTokenInput[] = [
	{ type: "+1", value: 1, isFail: false, isSuccess: false, revealCount: 2 },
	{ type: "skull", value: -2, isFail: false, isSuccess: false, revealCount: 3 },
	{ type: "autoFail", value: 0, isFail: true, isSuccess: false, revealCount: 1 },
	{ type: "elderSign", value: 0, isFail: false, isSuccess: true, revealCount: 1 },
];

// Using helper function (recommended)
const totalCount = countChaosTokens(tokens); // Returns 4 (количество элементов в массиве)

// Or call JSI directly with JSON string
const totalCountDirect = ChaosOdds.count(JSON.stringify(tokens)); // Returns 4
```

## Setup

### Rust Targets

#### iOS
```bash
rustup target add aarch64-apple-ios aarch64-apple-ios-sim x86_64-apple-ios
```

#### Android
```bash
rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android
```

### Build Scripts

- `npm run build` - Build for iOS and Android
- `npm run build:ios` - Build iOS xcframework
- `npm run build:android` - Build Android libraries
- `npm run clean` - Clean Rust build artifacts
- `npm run test` - Run Rust tests

## Documentation

- [RUST_JSI_SETUP.md](./RUST_JSI_SETUP.md) - Complete setup guide
- [example.ts](./example.ts) - Usage examples

## Project Structure

```
chaos-odds/
├── rust/              # Rust source code
│   ├── src/lib.rs    # FFI exports
│   └── Cargo.toml    # Rust config
├── cpp/              # C++ JSI bindings
│   ├── ChaosOddsJSI.h
│   └── ChaosOddsJSI.cpp
├── ios/              # iOS integration
│   ├── ChaosOddsJSIModule.h/mm
│   └── chaos_odds.xcframework/
├── android/          # Android integration
│   ├── CMakeLists.txt
│   └── src/main/cpp/ChaosOddsJNI.cpp
└── src/              # TypeScript API
    └── ChaosOddsJSI.ts
```

## License

MIT
