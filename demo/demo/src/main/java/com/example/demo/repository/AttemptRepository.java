package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Attempt;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> {

}
