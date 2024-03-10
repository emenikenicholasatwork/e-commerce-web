package net.services.userService;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.var;
import net.components.componentsServices.ImageService;
import net.model.Product;
import net.model.ProductCount;
import net.model.ShoppingCart;
import net.model.User;
import net.repository.userRepository.UserRepository;
import net.services.ProductService;
import net.services.ServiceInterface;

@Service
@RequiredArgsConstructor
public class UserService implements ServiceInterface {

    @Value("${encryption.key}")
    private String key;

    private final UserRepository userRepository;
    private final ProductService productService;

    public User getUserProfile(String email) {
        return userRepository.findByEmail(email).get();
    }

    public ShoppingCart getUserShopingCart(String id) throws Exception {
        var user = userRepository.findByEmail(id).get();
        var shoppingCart = user.getShoppingCart();
        // shoppingCart.setUser(user);
        List<Product> products = shoppingCart.getProducts();
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
        shoppingCart.setProducts(newProducts);
        int total = 0;
        var productCount = shoppingCart.getProductCount();
        for (ProductCount PC : productCount) {
            var product = productService.getProduct(PC.getProductId());
            var productPrice = product.getPrice();
            var count = PC.getCount();
            var t1 = productPrice * count;
            total += t1;
        }
        shoppingCart.setTotal((long) total);
        return shoppingCart;
    }

    public void addItemToCart(String userId, Long productId) {
        var user = userRepository.findByEmail(userId).get();
        var product = productService.getProduct(productId);
        var shoppingCart = user.getShoppingCart();
        var products = shoppingCart.getProducts();
        var productCount = shoppingCart.getProductCount();

        // check if the product is already in the cart
        if (products.contains(product)) {
            // increament the count of the product in the users shopping cart
            for (ProductCount PC : shoppingCart.getProductCount()) {
                if (PC.getProductId().equals(productId)) {
                    PC.setCount(PC.getCount() + 1);
                }
            }
        } else {
            // add the product to the user shopping cart
            var PC = ProductCount.builder().productId(productId).count(1).build();
            productCount.add(PC);
            products.add(product);
        }

        // update the list of the product in the users shopping cart
        shoppingCart.setProducts(products);
        shoppingCart.setProductCount(productCount);
        user.setShoppingCart(shoppingCart);
        userRepository.save(user);
    }

    public void deleteItemFromCart(String userId, Long productId) {
        var user = userRepository.findByEmail(userId).get();
        var shoppingCart = user.getShoppingCart();
        var products = shoppingCart.getProducts();
        var productCount = shoppingCart.getProductCount();
        Iterator<Product> iterator = products.iterator();
        while (iterator.hasNext()) {
            Product prod = iterator.next();
            if (prod.getId().equals(productId)) {
                iterator.remove();
            }
        }
        Iterator<ProductCount> iterator2 = productCount.iterator();
        while (iterator2.hasNext()) {
            ProductCount PC = iterator2.next();
            if (PC.getProductId().equals(productId)) {
                iterator2.remove();
            }
        }
        shoppingCart.setProductCount(productCount);
        shoppingCart.setProducts(products);
        user.setShoppingCart(shoppingCart);
        userRepository.save(user);
    }

    public void reduceProductCount(String userId, Long productId) {
        var user = userRepository.findByEmail(userId).get();
        var productCount = user.getShoppingCart().getProductCount();
        for (ProductCount PC : productCount) {
            if (PC.getProductId().equals(productId) && PC.getCount() > 1) {
                PC.setCount(PC.getCount() - 1);
            }
        }
        user.getShoppingCart().setProductCount(productCount);
        userRepository.save(user);
    }

}
