package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Event;
import com.example.demo.repository.EventRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping
    public ResponseEntity<Object> getEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> createEvent(@RequestBody Event eventData) {
        eventRepository.save(eventData);
        return ResponseEntity.ok().build();
    }
}
