package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Event;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

}
