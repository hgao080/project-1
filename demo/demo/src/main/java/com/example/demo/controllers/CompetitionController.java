package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{compTitle}")
    public ResponseEntity<Object> addQuestionToCompetition(@PathVariable("compTitle") String compTitle, @RequestBody Map<String, Object> data) {
        Competition comp = competitionRepository.findByTitle(compTitle);
        List<String> questionIds = (List<String>) data.get("questionIds");
        comp.addQuestions(questionIds);
        competitionRepository.save(comp);
        return ResponseEntity.ok(comp);
    }

}
