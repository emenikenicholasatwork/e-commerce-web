package net.controllers.adminController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.components.RecentActivities;
import net.components.componentsServices.RecentActivitiesService;
import net.model.Product;
import net.model.User;
import net.services.adminService.AdminUserService;
import net.services.adminService.ItemService;

@RestController
@RequestMapping(path = "/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ItemService itemService;
    private final AdminUserService adminUserService;
    private final RecentActivitiesService recentActivitiesService;

    @Value("${encryption.images}")
    private String path;

    @PostMapping(value = "/item/add")
    public ResponseEntity<?> addNewProduct(@RequestParam Map<String, String> requestParaMap) throws Exception {
        String name = requestParaMap.get("name");
        String brand = requestParaMap.get("brand");
        String price = requestParaMap.get("price");
        String description = requestParaMap.get("description");
        String available = requestParaMap.get("available");
        String image1 = requestParaMap.get("image1");
        String image2 = requestParaMap.get("image2");
        String image3 = requestParaMap.get("image3");
        String image4 = requestParaMap.get("image4");

        Product product = Product.builder()
                .name(name)
                .brand(brand)
                .description(description)
                .price(Float.parseFloat(price))
                .available(Integer.parseInt(available))
                .image1(image1)
                .image2(image2)
                .image3(image3)
                .image4(image4)
                .build();
        return itemService.saveItem(product);
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    @GetMapping("/recentActivites")
    public List<RecentActivities> getAllRecentActivities() {
        return recentActivitiesService.getRecentActivites();
    }

    @GetMapping("/item/all")
    public List<Product> getProducts() throws Exception {
        return adminUserService.getAllProducts();
    }

    @DeleteMapping("/delete/item")
    public List<Product> deleteProducts(@RequestParam Long productId) throws Exception {
        adminUserService.deleteItem(productId);
        return adminUserService.getAllProducts();
    }
}
