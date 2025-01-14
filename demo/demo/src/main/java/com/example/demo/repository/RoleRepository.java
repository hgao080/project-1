package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.enums.RoleEnum;
import com.example.demo.models.Role;

public interface RoleRepository extends MongoRepository<Role, String>{
    Optional<Role> findByName(RoleEnum name);
}
