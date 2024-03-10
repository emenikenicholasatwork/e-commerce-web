package net.controllers.userContoller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.model.User;
import net.model.UserDetails;
import net.services.userService.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/details")
    public UserDetails getUserDetails(@RequestParam String userId) {
        User user = userService.getUserProfile(userId);
        return UserDetails.builder()
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }

    @GetMapping("/addToCart")
    public ResponseEntity<String> addToCart(@RequestParam String userId, Long productId) {
        userService.addItemToCart(userId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCartItems(@RequestParam String userId) throws Exception {
        return new ResponseEntity<>(userService.getUserShopingCart(userId), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFromCart")
    public ResponseEntity<?> deleteFromCart(@RequestParam String userId, Long productId) {
        userService.deleteItemFromCart(userId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/reduceProductCount")
    public void reduceProductCount(@RequestParam String userId, Long productId) {
        userService.reduceProductCount(userId, productId);
    }

}
