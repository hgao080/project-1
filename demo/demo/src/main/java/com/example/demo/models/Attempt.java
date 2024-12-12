package com.example.demo.models;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("attempt")
public class Attempt {
    private String userEmail;
    private String competitionId;
    private Map<String, Integer> attempts;
    
    public Attempt() {
    }

    public Attempt(String userEmail, String competitionId, Map<String, Integer> attempts) {
        this.userEmail = userEmail;
        this.competitionId = competitionId;
        this.attempts = attempts;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public Map<String, Integer> getAttempts() {
        return attempts;
    }

    public void setAttempts(Map<String, Integer> attempts) {
        this.attempts = attempts;
    }
}
