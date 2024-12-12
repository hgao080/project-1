package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
    public User findByUsername(String username);
}
