package com.example.demo.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        Event createdEvent = eventRepository.save(eventData);
        return ResponseEntity.ok(createdEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable("id") String id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> addCompetition(@PathVariable("id") String id, @RequestBody Map<String, Object> data) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        Event existingEvent = optionalEvent.get();

        String competitionId = (String) data.get("competitionId");
        existingEvent.setCompetitionId(competitionId);
        eventRepository.save(existingEvent);

        return ResponseEntity.ok(existingEvent);
    }
}
