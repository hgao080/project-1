package com.example.demo.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EventDTO;
import com.example.demo.dto.MarkingResultDTO;
import com.example.demo.models.Attempt;
import com.example.demo.models.Competition;
import com.example.demo.models.Event;
import com.example.demo.models.User;
import com.example.demo.repository.AttemptRepository;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.UserRepository;

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

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Object> getEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getEvent(@PathVariable("id") String id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (!optionalEvent.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optionalEvent.get());
    }

    @GetMapping("/mark/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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

        List<Attempt> attempts = attemptRepository.findByEventId(event.getId());

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

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> createEvent(@RequestBody Event eventData) {
        Event createdEvent = eventRepository.save(eventData);
        return ResponseEntity.ok(createdEvent);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deleteEvent(@PathVariable("id") String id) {
        Event eventToBeDeleted = eventRepository.findById(id).get();

        eventRepository.deleteById(id);

        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.removeEvent(eventToBeDeleted.getName());
            userRepository.save(user);
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> addCompetition(@PathVariable("id") String id, @RequestBody EventDTO data) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        Event existingEvent = optionalEvent.get();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");

        String competitionId = (String) data.getCompetitionId();
        Date competitionStart;
        Date competitionEnd;
        try {
            competitionStart = formatter.parse(data.getCompetitionStart());
            competitionEnd = formatter.parse(data.getCompetitionEnd());
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format");
        }

        existingEvent.assignCompetition(competitionId, competitionStart, competitionEnd);
        eventRepository.save(existingEvent);

        return ResponseEntity.ok(existingEvent);
    }

}
