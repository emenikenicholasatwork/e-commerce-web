package net.controllers.homeController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.model.Product;
import net.services.adminService.ItemService;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/home")
public class HomeController {

    private final ItemService itemService;

    @GetMapping("/item/all")
    public List<Product> getAllProduct() throws Exception {
        return itemService.getAllProducts();
    }
}
