package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("question")
public class Question {
    @Id
    private String title;
    private List<String> options;
    private int correctChoiceIndex;
    
    public Question() {
    }

    public Question(String title, List<String> options, int correctChoiceIndex) {
        this.title = title;
        this.options = options;
        this.correctChoiceIndex = correctChoiceIndex;
    }

    @Override
    public String toString() {
        return "Question [title=" + title + ", options=" + options + ", correctChoiceIndex=" + correctChoiceIndex + "]";
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectChoiceIndex() {
        return correctChoiceIndex;
    }

    public void setCorrectChoiceIndex(int correctChoiceIndex) {
        this.correctChoiceIndex = correctChoiceIndex;
    }
}
