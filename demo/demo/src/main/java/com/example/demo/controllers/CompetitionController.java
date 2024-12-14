package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Competition;
import com.example.demo.models.Question;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.QuestionRepository;

@CrossOrigin
@RestController
@RequestMapping("api/competition")
public class CompetitionController {

    @Autowired
    CompetitionRepository competitionRepository;

    @Autowired
    QuestionRepository questionRepository;

    @PostMapping
    public ResponseEntity<Object> createCompetition(@RequestBody Competition competitionDetails) {
        Competition savedCompetition = competitionRepository.save(competitionDetails);
        return ResponseEntity.ok(savedCompetition);
    }

    @PutMapping("/{compTitle}")
    public ResponseEntity<Object> addQuestionToCompetition(@PathVariable("compTitle") String compTitle, @RequestBody Question question) {
        Competition comp = competitionRepository.findByTitle(compTitle);
        comp.addQuestion(question.getTitle());
        competitionRepository.save(comp);
        return ResponseEntity.ok(comp);
    }

    @GetMapping
    public ResponseEntity<Object> getCompetitions() {
        return ResponseEntity.ok(competitionRepository.findAll());
    }

    @GetMapping("/{compTitle}") ResponseEntity<Object> getCompQuestions(@PathVariable("compTitle") String compTitle) {
        Competition comp = competitionRepository.findByTitle(compTitle);
        List<Question> questions = questionRepository.findAllById(comp.getQuestionIds());

        Map<String, Object> response = new HashMap<>();
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }
}
