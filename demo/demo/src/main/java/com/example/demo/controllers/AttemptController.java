package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AttemptDTO;
import com.example.demo.models.Attempt;
import com.example.demo.repository.AttemptRepository;

@CrossOrigin
@RestController
@RequestMapping("api/attempt")
public class AttemptController {

    @Autowired
    AttemptRepository attemptRepository;

    @GetMapping("/{userEmail}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getAttemptsForUser(@PathVariable String userEmail) {
        List<Attempt> attempts = attemptRepository.findByUserEmail(userEmail);

        if (attempts.isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(attempts);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> saveAttempt(@RequestBody AttemptDTO attemptDto) {
        Attempt attemptToSave = attemptDto.getAttempt();

        List<Attempt> competitionAttempts = attemptRepository.findByCompetitionId(attemptDto.getAttempt().getCompetitionId());
        for (Attempt attempt : competitionAttempts) {
            if (attempt.getUserEmail().equals(attemptToSave.getUserEmail())) {
                return ResponseEntity.badRequest().body("Attempt not accepted. User has already attempted this competition");
            }
        }

        Date now = new Date();
        Date competitionEnd = attemptDto.getCompetitionEnd();
        competitionEnd.setTime(competitionEnd.getTime() + 60000);

        if (now.after(competitionEnd)) {
            return ResponseEntity.badRequest().body("Attempt not accepted. Competition has ended");
        }

        attemptRepository.save(attemptToSave);

        return ResponseEntity.ok(attemptToSave);
    }
}
