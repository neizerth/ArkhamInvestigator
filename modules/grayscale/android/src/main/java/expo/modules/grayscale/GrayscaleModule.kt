package expo.modules.grayscale

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.graphics.Paint
import android.util.Base64
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream

class GrayscaleModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Grayscale")

    AsyncFunction("toGrayscale") { base64: String ->
      try {
        val result = convertToGrayscale(base64)
        mapOf("base64" to result)
      } catch (e: Exception) {
        mapOf("base64" to "")
      }
    }
  }

  private fun convertToGrayscale(base64Input: String): String {
    try {
      // Validate input
      if (base64Input.isEmpty()) {
        return ""
      }

      // Strip data URI prefix if present (e.g., "data:image/png;base64,")
      var base64String = base64Input
      if (base64String.contains("base64,")) {
        val components = base64String.split("base64,")
        if (components.size > 1) {
          base64String = components[1]
        }
      }

      // Remove all whitespace and newline characters
      base64String = base64String.replace("\\s".toRegex(), "")

      // Validate base64 string is not empty after cleaning
      if (base64String.isEmpty()) {
        return ""
      }

      // Decode base64 string to image data
      val decodedBytes = Base64.decode(base64String, Base64.DEFAULT)
      if (decodedBytes.isEmpty()) {
        return ""
      }

      // Decode with options to prevent OOM errors
      val options = BitmapFactory.Options().apply {
        inJustDecodeBounds = true
      }
      BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size, options)

      // Check dimensions to prevent memory issues
      val maxDimension = 4096
      val width = options.outWidth
      val height = options.outHeight

      if (width <= 0 || height <= 0 || width > maxDimension || height > maxDimension) {
        return ""
      }

      // Calculate sample size if needed
      var sampleSize = 1
      if (width > maxDimension || height > maxDimension) {
        val widthRatio = (width.toFloat() / maxDimension).toInt()
        val heightRatio = (height.toFloat() / maxDimension).toInt()
        sampleSize = maxOf(widthRatio, heightRatio)
      }

      options.inJustDecodeBounds = false
      options.inSampleSize = sampleSize

      val originalBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size, options)
        ?: return ""

      // Convert to grayscale
      val grayscaleBitmap = convertImageToGrayscale(originalBitmap)
        ?: run {
          originalBitmap.recycle()
          return ""
        }

      // Convert to PNG and encode to base64
      val outputStream = ByteArrayOutputStream()
      grayscaleBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
      val pngBytes = outputStream.toByteArray()

      // Clean up bitmaps
      if (originalBitmap != grayscaleBitmap) {
        originalBitmap.recycle()
      }
      grayscaleBitmap.recycle()

      return Base64.encodeToString(pngBytes, Base64.DEFAULT)
    } catch (e: Exception) {
      return ""
    }
  }

  private fun convertImageToGrayscale(originalBitmap: Bitmap): Bitmap? {
    try {
      // Create a new bitmap with the same dimensions
      val grayscaleBitmap = Bitmap.createBitmap(
        originalBitmap.width,
        originalBitmap.height,
        Bitmap.Config.ARGB_8888
      )

      // Create canvas to draw on the new bitmap
      val canvas = Canvas(grayscaleBitmap)

      // Create paint with grayscale color matrix
      val paint = Paint()
      val colorMatrix = ColorMatrix()
      colorMatrix.setSaturation(0f)
      val colorFilter = ColorMatrixColorFilter(colorMatrix)
      paint.colorFilter = colorFilter

      // Draw the original bitmap onto the new bitmap with grayscale filter
      canvas.drawBitmap(originalBitmap, 0f, 0f, paint)

      return grayscaleBitmap
    } catch (e: Exception) {
      return null
    }
  }
}
