package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> getCompetitions() {
        return ResponseEntity.ok(competitionRepository.findAll());
    }

    @GetMapping("/{compTitle}")
    @PreAuthorize("isAuthenticated()")
    ResponseEntity<Object> getCompQuestions(@PathVariable("compTitle") String compTitle) {
        Competition comp = competitionRepository.findByTitle(compTitle);
        List<Question> questions = questionRepository.findAllById(comp.getQuestionIds());

        Map<String, Object> response = new HashMap<>();
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> createCompetition(@RequestBody Competition competitionDetails) {
        Competition savedCompetition = competitionRepository.save(competitionDetails);
        return ResponseEntity.ok(savedCompetition);
    }

    @PutMapping("/{compTitle}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> addQuestionsToCompetition(@PathVariable("compTitle") String compTitle,
            @RequestBody HashMap<Object, Object> data) {
        Competition comp = competitionRepository.findByTitle(compTitle);
        List<String> questionTitles = (List<String>) data.get("questionTitles");
        comp.addQuestions(questionTitles);
        competitionRepository.save(comp);
        return ResponseEntity.ok(comp);
    }
}
