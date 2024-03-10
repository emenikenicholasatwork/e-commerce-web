package net.services.adminService;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;

import net.admin.Item.Item;
import net.model.Product;
import net.model.User;

public interface AdminServiceInterface {

    void deleteItem(Long item);

    List<User> getAllUsers();

    ResponseEntity<String> addEntityImage(Item item);

    ResponseEntity<?> saveItem(Product product) throws IOException, Exception;
}
