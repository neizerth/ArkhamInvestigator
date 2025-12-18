import ExpoModulesCore
import UIKit

public class GrayscaleModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Grayscale")

    AsyncFunction("toGrayscale") { (base64: String) -> [String: String] in
      return autoreleasepool {
        let result = self.convertToGrayscale(base64: base64)
        return ["base64": result]
      }
    }
  }
  
  private func convertToGrayscale(base64: String) -> String {
    // Validate input
    guard !base64.isEmpty else {
      return ""
    }
    
    // Strip data URI prefix if present (e.g., "data:image/png;base64,")
    var base64String = base64
    if base64.contains("base64,") {
      let components = base64.components(separatedBy: "base64,")
      if components.count > 1 {
        base64String = components[1]
      }
    }
    
    // Remove all whitespace and newline characters
    base64String = base64String.components(separatedBy: .whitespacesAndNewlines).joined()
    
    // Validate base64 string is not empty after cleaning
    guard !base64String.isEmpty else {
      return ""
    }
    
    // Decode base64 string to image data
    guard let originalImageData = Data(base64Encoded: base64String, options: .ignoreUnknownCharacters),
          !originalImageData.isEmpty,
          let originalImage = UIImage(data: originalImageData) else {
      return ""
    }
    
    // Validate image size to prevent memory issues
    let maxDimension: CGFloat = 4096
    let imageSize = originalImage.size
    if imageSize.width > maxDimension || imageSize.height > maxDimension {
      // Scale down if too large
      let scale = min(maxDimension / imageSize.width, maxDimension / imageSize.height)
      let scaledSize = CGSize(width: imageSize.width * scale, height: imageSize.height * scale)
      
      guard let scaledImage = self.scaleImage(image: originalImage, toSize: scaledSize) else {
        return ""
      }
      
      guard let grayscaleImage = self.convertImageToGrayscale(image: scaledImage) else {
        return ""
      }
      
      guard let pngData = grayscaleImage.pngData() else {
        return ""
      }
      
      return pngData.base64EncodedString(options: .lineLength64Characters)
    }
    
    // Convert to grayscale
    guard let grayscaleImage = self.convertImageToGrayscale(image: originalImage) else {
      return ""
    }
    
    // Convert to PNG and encode to base64
    guard let pngData = grayscaleImage.pngData() else {
      return ""
    }
    
    return pngData.base64EncodedString(options: .lineLength64Characters)
  }
  
  private func scaleImage(image: UIImage, toSize size: CGSize) -> UIImage? {
    autoreleasepool {
      UIGraphicsBeginImageContextWithOptions(size, false, image.scale)
      defer { UIGraphicsEndImageContext() }
      
      image.draw(in: CGRect(origin: .zero, size: size))
      return UIGraphicsGetImageFromCurrentImageContext()
    }
  }
  
  private func convertImageToGrayscale(image: UIImage) -> UIImage? {
    return autoreleasepool {
      // Create image rectangle with current image width/height
      let imageRect = CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height)
      
      // Grayscale color space
      guard let colorSpace = CGColorSpace(name: CGColorSpace.genericGrayGamma2_2) else {
        return nil
      }
      
      // Validate dimensions to prevent memory issues
      let width = Int(image.size.width)
      let height = Int(image.size.height)
      
      guard width > 0 && height > 0 && width <= 4096 && height <= 4096 else {
        return nil
      }
      
      // Create bitmap context with current image size and grayscale colorspace
      guard let context = CGContext(
        data: nil,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: 0,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.none.rawValue
      ) else {
        return nil
      }
      
      // Draw image into current context, with specified rectangle
      // using previously defined context (with grayscale colorspace)
      guard let cgImage = image.cgImage else {
        return nil
      }
      context.draw(cgImage, in: imageRect)
      
      // Create bitmap image info from pixel data in current context
      guard let grayscaleCGImage = context.makeImage() else {
        return nil
      }
      
      // Create a new UIImage object
      let newImage = UIImage(cgImage: grayscaleCGImage)
      
      return newImage
    }
  }
}
