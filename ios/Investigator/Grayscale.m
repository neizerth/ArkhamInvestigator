#import "Grayscale.h"
#import <UIKit/UIKit.h>

@implementation Grayscale

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(toGrayscale:(NSString *)base64 callback:(RCTResponseSenderBlock)callback)
{
    @try {
        // Strip data URI prefix if present (e.g., "data:image/png;base64,")
        NSString *base64String = base64;
        if ([base64 containsString:@"base64,"]) {
            NSArray *components = [base64 componentsSeparatedByString:@"base64,"];
            if (components.count > 1) {
                base64String = components[1];
            }
        }
        
        // Remove all whitespace and newline characters
        base64String = [[base64String componentsSeparatedByCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] componentsJoinedByString:@""];
        
        NSLog(@"Base64 string length: %lu", (unsigned long)[base64String length]);
        NSLog(@"First 100 chars: %@", [base64String substringToIndex:MIN(100, [base64String length])]);
        
        // Decode base64 string to image data
        NSData *originalImageData = [[NSData alloc] initWithBase64EncodedString:base64String options:NSDataBase64DecodingIgnoreUnknownCharacters];
        UIImage *originalImage = [UIImage imageWithData:originalImageData];
        
        NSLog(@"Decoded image data length: %lu", (unsigned long)[originalImageData length]);
        NSLog(@"Received image: %@", originalImage);
        
        if (!originalImage) {
            callback(@[@""]);
            return;
        }
        
        UIImage* grayscaleImage = [self convertImageToGrayscale: originalImage];
        NSString* base64Grayscale = [UIImagePNGRepresentation(grayscaleImage) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
        callback(@[base64Grayscale]);
    }
    @catch(NSException* exception) {
        NSLog(@"Exception: %@", exception);
        callback(@[@""]);
    }
}

- (UIImage *)convertImageToGrayscale:(UIImage *)image
{
    // Create image rectangle with current image width/height
    CGRect imageRect = CGRectMake(0, 0, image.size.width, image.size.height);
    
    // Grayscale color space
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceGray();
    
    // Create bitmap content with current image size and grayscale colorspace
    CGContextRef context = CGBitmapContextCreate(nil, image.size.width, image.size.height, 8, 0, colorSpace, kCGImageAlphaNone);
    
    // Draw image into current context, with specified rectangle
    // using previously defined context (with grayscale colorspace)
    CGContextDrawImage(context, imageRect, [image CGImage]);
    
    // Create bitmap image info from pixel data in current context
    CGImageRef imageRef = CGBitmapContextCreateImage(context);
    
    // Create a new UIImage object
    UIImage *newImage = [UIImage imageWithCGImage:imageRef];
    
    // Release colorspace, context and bitmap information
    CGColorSpaceRelease(colorSpace);
    CGContextRelease(context);
    
    if (imageRef) {
        CFRelease(imageRef);
    }
    
    // Return the new grayscale image
    return newImage;
}

@end

