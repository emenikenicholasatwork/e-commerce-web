package net.services.adminService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.admin.Item.Item;
import net.components.componentsServices.ImageService;
import net.model.Product;
import net.model.User;
import net.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ItemService implements AdminServiceInterface {

        private final ProductRepository productRepository;

        @Value("${encryption.key}")
        private String key;

        @Value("${encryption.images}")
        private String imageLocation;

        @Override
        public void deleteItem(Long productId) {
                var product = productRepository.findById(productId).get();
                ImageService.deleteEncryptedImages(product.getImage1());
                ImageService.deleteEncryptedImages(product.getImage2());
                ImageService.deleteEncryptedImages(product.getImage3());
                ImageService.deleteEncryptedImages(product.getImage4());
                productRepository.deleteById(productId);
        }

        @Override
        public List<User> getAllUsers() {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'getAllUsers'");
        }

        @Override
        public ResponseEntity<String> addEntityImage(Item item) {
                return null;
        }

        @Override
        public ResponseEntity<?> saveItem(Product product) throws Exception {
                Product newProduct = Product.builder()
                                .name(product.getName())
                                .available(product.getAvailable())
                                .brand(product.getBrand())
                                .price(product.getPrice())
                                .description(product.getDescription())
                                .image1(ImageService
                                                .saveImageBytes(
                                                                ImageService.encryptImage(
                                                                                product.getImage1().getBytes(),
                                                                                ImageService.getKey(key))))
                                .image2(ImageService
                                                .saveImageBytes(
                                                                ImageService.encryptImage(
                                                                                product.getImage2().getBytes(),
                                                                                ImageService.getKey(key))))
                                .image3(ImageService
                                                .saveImageBytes(
                                                                ImageService.encryptImage(
                                                                                product.getImage3().getBytes(),
                                                                                ImageService.getKey(key))))
                                .image4(ImageService
                                                .saveImageBytes(
                                                                ImageService.encryptImage(
                                                                                product.getImage4().getBytes(),
                                                                                ImageService.getKey(key))))
                                .build();

                return new ResponseEntity<>(productRepository.save(newProduct), HttpStatus.OK);
        }

        public List<Product> getAllProducts() throws Exception {
                List<Product> products = productRepository.findAll();
                List<Product> newProducts = new ArrayList<>();
                for (Product p : products) {
                        String imag1Path = p.getImage1();
                        String imag2Path = p.getImage2();
                        String imag3Path = p.getImage3();
                        String imag4Path = p.getImage4();
                        p.setImage1(ImageService
                                        .decodeImageBytes(ImageService.decryptImage(
                                                        ImageService.loaderImageBytes(imag1Path),
                                                        ImageService.getKey(key))));
                        p.setImage2(ImageService
                                        .decodeImageBytes(ImageService.decryptImage(
                                                        ImageService.loaderImageBytes(imag2Path),
                                                        ImageService.getKey(key))));
                        p.setImage3(ImageService
                                        .decodeImageBytes(ImageService.decryptImage(
                                                        ImageService.loaderImageBytes(imag3Path),
                                                        ImageService.getKey(key))));
                        p.setImage4(ImageService
                                        .decodeImageBytes(ImageService.decryptImage(
                                                        ImageService.loaderImageBytes(imag4Path),
                                                        ImageService.getKey(key))));
                        newProducts.add(p);
                }
                return newProducts;
        }
}
