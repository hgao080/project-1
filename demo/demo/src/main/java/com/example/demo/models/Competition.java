package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("competition")
public class Competition {
    @Id
    private String title;
    private List<String> questionIds;
    
    public Competition() {
    }

    public Competition(String title, List<String> questionIds) {
        this.title = title;
        this.questionIds = questionIds;
    }

    @Override
    public String toString() {
        return "Competition [title=" + title + ", questionIds=" + questionIds + "]";
    }

    public void addQuestions(List<String> questionTitles) {
        if (questionIds == null) {
            questionIds = new ArrayList<>();
        }

        for (String string : questionTitles) {
            if (questionIds.contains(string)) {
                continue;
            }
            questionIds.add(string);
        }
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<String> questionIds) {
        this.questionIds = questionIds;
    }
}
