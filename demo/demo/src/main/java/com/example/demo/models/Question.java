package com.example.demo.models;

import java.util.List;

public class Question {
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
