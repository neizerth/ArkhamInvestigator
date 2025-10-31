package com.arkhaminvestigator.dev

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.util.Base64
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream

class GrayscaleModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Grayscale"
    }

    @ReactMethod
    fun toGrayscale(base64Image: String, callback: Callback) {
        try {
            val grayscaledBitmap = convertBase64ToGrayscale(base64Image)
            val b64Grayscaled = convertBitmapToBase64(grayscaledBitmap)
            callback.invoke(b64Grayscaled)
        } catch (e: Exception) {
            callback.invoke("")
        }
    }

    private fun convertBase64ToGrayscale(base64Image: String): Bitmap {
        // Strip data URI prefix if present (e.g., "data:image/png;base64,")
        val base64String = if (base64Image.contains("base64,")) {
            base64Image.substringAfter("base64,")
        } else {
            base64Image
        }
        
        val imageBytes = Base64.decode(base64String, Base64.DEFAULT)
        val originalBitmap = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
        val grayscaleBitmap = Bitmap.createBitmap(
            originalBitmap.width,
            originalBitmap.height,
            Bitmap.Config.RGB_565
        )

        for (x in 0 until originalBitmap.width) {
            for (y in 0 until originalBitmap.height) {
                val pixel = originalBitmap.getPixel(x, y)
                val gray = (Color.red(pixel) * 0.299 + Color.green(pixel) * 0.587 + Color.blue(pixel) * 0.114).toInt()
                grayscaleBitmap.setPixel(x, y, Color.rgb(gray, gray, gray))
            }
        }

        return grayscaleBitmap
    }

    private fun convertBitmapToBase64(bitmap: Bitmap): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.DEFAULT)
    }
}

