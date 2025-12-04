import ExpoModulesCore
import UIKit

public class GrayscaleModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Grayscale")

    AsyncFunction("toGrayscale") { (base64: String) -> [String: String] in
      do {
        let result = try self.convertToGrayscale(base64: base64)
        return ["base64": result]
      } catch {
        return ["base64": ""]
      }
    }
  }
  
  private func convertToGrayscale(base64: String) throws -> String {
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
    
    // Decode base64 string to image data
    guard let originalImageData = Data(base64Encoded: base64String, options: .ignoreUnknownCharacters),
          let originalImage = UIImage(data: originalImageData) else {
      return ""
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
  
  private func convertImageToGrayscale(image: UIImage) -> UIImage? {
    // Create image rectangle with current image width/height
    let imageRect = CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height)
    
    // Grayscale color space
    guard let colorSpace = CGColorSpace(name: CGColorSpace.genericGrayGamma2_2) else {
      return nil
    }
    
    // Create bitmap context with current image size and grayscale colorspace
    guard let context = CGContext(
      data: nil,
      width: Int(image.size.width),
      height: Int(image.size.height),
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
