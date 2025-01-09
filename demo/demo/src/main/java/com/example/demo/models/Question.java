package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.enums.Difficulty;
import com.example.demo.enums.Topic;

@Document("question")
public class Question {
    @Id
    private String title;
    private List<String> options;
    private int correctChoiceIndex;
    private Difficulty difficulty;
    private List<Topic> topics = new ArrayList<>();
    
    public Question() {
    }

    public Question(String title, List<String> options, int correctChoiceIndex, Difficulty difficulty, List<Topic> topic) {
        this.title = title;
        this.options = options;
        this.correctChoiceIndex = correctChoiceIndex;
        this.difficulty = difficulty;
        topics.addAll(topic);
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

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }
}
