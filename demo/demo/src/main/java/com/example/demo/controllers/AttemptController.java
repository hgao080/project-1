package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Attempt;
import com.example.demo.repository.AttemptRepository;

@CrossOrigin
@RestController
@RequestMapping("api/attempt")
public class AttemptController {

    @Autowired
    AttemptRepository attemptRepository;

    @PostMapping
    public ResponseEntity<Object> saveAttempt(@RequestBody Attempt attempt) {
        Attempt savedAttempt = attemptRepository.save(attempt);

        return ResponseEntity.ok(savedAttempt);
    }
}
