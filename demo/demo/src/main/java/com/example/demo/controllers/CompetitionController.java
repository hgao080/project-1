package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Competition;
import com.example.demo.repository.CompetitionRepository;

@CrossOrigin
@RestController
@RequestMapping("api/competition")
public class CompetitionController {

    @Autowired
    CompetitionRepository competitionRepository;

    @PostMapping
    public ResponseEntity<Object> createCompetition(@RequestBody Competition competitionDetails) {
        Competition savedCompetition = competitionRepository.save(competitionDetails);
        return ResponseEntity.ok(savedCompetition);
    }

}
