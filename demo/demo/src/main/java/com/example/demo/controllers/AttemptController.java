package com.example.demo.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping
    public ResponseEntity<Object> saveAttempt(@RequestBody AttemptDTO attemptDto) {

        Date now = new Date();
        Date competitionEnd = attemptDto.getCompetitionEnd();
        competitionEnd.setTime(competitionEnd.getTime() + 60000);

        if (now.after(competitionEnd)) {
            return ResponseEntity.badRequest().body("Attempt not accepted. Competition has ended");
        }

        Attempt savedAttempt = attemptRepository.save(attemptDto.getAttempt());

        return ResponseEntity.ok(savedAttempt);
    }
}
