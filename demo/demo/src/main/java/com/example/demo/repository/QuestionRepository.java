package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Question;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

}
