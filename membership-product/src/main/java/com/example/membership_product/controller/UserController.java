package com.example.membership_product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.membership_product.model.User;
import com.example.membership_product.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.loginUser(user));
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<User> purchaseProduct(@PathVariable Long id) {
        return ResponseEntity.ok(userService.purchaseProduct(id));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<User> cancelPurchase(@PathVariable Long id) {
        return ResponseEntity.ok(userService.cancelPurchase(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        userService.deleteAccount(id);
        return ResponseEntity.ok().build();
    }
}
