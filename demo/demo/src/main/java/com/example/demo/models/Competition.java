package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Competition")
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
