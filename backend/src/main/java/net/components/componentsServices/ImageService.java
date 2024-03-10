package net.components.componentsServices;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

@Component
public class ImageService {
    public static byte[] encryptImage(byte[] image, Key key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(image);
    }

    public static byte[] decryptImage(byte[] image, Key key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(image);
    }

    public static String saveImageBytes(byte[] image) throws Exception {
        boolean saved = false;
        String savedPath = "";
        int i = 0;
        while (!saved) {
            File file = new File("src/main/resources/EncryptedImages/" + i);
            if (file.exists()) {
                i++;
            } else {
                FileOutputStream fileOutputStream = new FileOutputStream(file);
                fileOutputStream.write(image);
                fileOutputStream.close();
                saved = true;
                savedPath = file.getAbsolutePath();
            }
        }
        return savedPath;
    }

    public static byte[] loaderImageBytes(String path) throws Exception {
        FileInputStream fileInputStream = new FileInputStream(path);
        byte[] fileContent = new byte[fileInputStream.available()];
        fileInputStream.read(fileContent);
        fileInputStream.close();
        return fileContent;
    }

    public static void deleteEncryptedImages(String path) {
        File file = new File(path);
        if (file.exists())
            file.delete();
    }

    public static String decodeImageBytes(byte[] imageBytes) {
        String imageString = new String(imageBytes, StandardCharsets.UTF_8);
        return imageString;
    }

    public static SecretKey getKey(String key) {
        byte[] keyBytes = Base64.getDecoder().decode(key);
        SecretKey secretKey = new SecretKeySpec(keyBytes, 0, keyBytes.length, "AES");
        return secretKey;
    }
}
