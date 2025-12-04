# Grayscale Module

Native Expo module for converting images to grayscale on iOS, Android, and Web.

## Features

- ✅ iOS support (Swift)
- ✅ Android support (Kotlin)
- ✅ Web support (Canvas API)
- ✅ Base64 input/output
- ✅ Handles data URI prefixes automatically

## Installation

This is a local Expo module. It should be automatically linked when you build your app.

## Usage

```typescript
import { GrayscaleModule } from './modules/grayscale';

// Convert a base64 image to grayscale
const result = await GrayscaleModule.toGrayscale(base64Image);
console.log('Grayscale image:', result.base64);
```

### Input Format

The module accepts base64 strings in the following formats:

```typescript
// Plain base64
await GrayscaleModule.toGrayscale('iVBORw0KGgo...');

// With data URI prefix
await GrayscaleModule.toGrayscale('data:image/png;base64,iVBORw0KGgo...');
```

### Output Format

Returns a promise that resolves to:

```typescript
{
  base64: string; // PNG image encoded as base64 (without data URI prefix)
}
```

If conversion fails, returns `{ base64: '' }`.

## Implementation Details

### iOS (Swift)
- Uses Core Graphics for grayscale conversion
- Creates grayscale color space for optimal performance
- Outputs PNG format

### Android (Kotlin)
- Uses Android Bitmap and ColorMatrix for grayscale conversion
- ColorMatrix saturation set to 0 for grayscale effect
- Outputs PNG format

### Web (TypeScript)
- Uses Canvas API for grayscale conversion
- Applies grayscale algorithm: `0.299*R + 0.587*G + 0.114*B`
- Outputs PNG format

## Error Handling

All platforms gracefully handle errors and return empty base64 string on failure. Common error cases:
- Invalid base64 input
- Corrupted image data
- Unsupported image format
- Out of memory

## Performance

The module processes images natively on iOS and Android, providing optimal performance. Large images are handled efficiently through native bitmap operations.

