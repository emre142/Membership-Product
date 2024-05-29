package com.example.membership_product.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.membership_product.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
