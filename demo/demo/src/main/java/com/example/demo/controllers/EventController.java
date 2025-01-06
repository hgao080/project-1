package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.example.demo.dto.MarkingResultDTO;
import com.example.demo.models.Attempt;
import com.example.demo.models.Competition;
import com.example.demo.models.Event;
import com.example.demo.repository.AttemptRepository;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.QuestionRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    CompetitionRepository competitionRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    AttemptRepository attemptRepository;

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

    @GetMapping("/mark/{id}")
    public ResponseEntity<Object> markEvent(@PathVariable("id") String id) {

        Optional<Event> optionalEvent = eventRepository.findById(id);
        Event event = optionalEvent.get();
        
        if (event.getCompetitionId().isEmpty()) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "No associated competition");
            return ResponseEntity.badRequest().body(err);
        }

        String competitionId = event.getCompetitionId();
        Competition competition = competitionRepository.findByTitle(competitionId);
        if (competition == null) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "Competition does not exist");
            return ResponseEntity.badRequest().body(err);
        }

        List<Attempt> attempts = attemptRepository.findByCompetitionId(competitionId);

        List<MarkingResultDTO> res = new ArrayList<>();

        for (Attempt attempt : attempts) {
            Map<String, Integer> answers = attempt.getAttempts();
            int total = answers.size();
            int correct = 0;

            for (String key : answers.keySet()) {
                if (answers.get(key).equals(questionRepository.findByTitle(key).getCorrectChoiceIndex())) {
                    correct++;
                }
            }

            res.add(new MarkingResultDTO(attempt.getUserEmail(), (correct + "/" + total)));
        }

        return ResponseEntity.ok(res);
    }
}
