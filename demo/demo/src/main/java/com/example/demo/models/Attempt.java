package com.example.demo.models;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("attempt")
public class Attempt {
    private String userEmail;
    private String eventId;
    private Map<String, Integer> attempts;
    
    public Attempt() {
    }

    public Attempt(String userEmail, String eventId, Map<String, Integer> attempts) {
        this.userEmail = userEmail;
        this.eventId = eventId;
        this.attempts = attempts;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public Map<String, Integer> getAttempts() {
        return attempts;
    }

    public void setAttempts(Map<String, Integer> attempts) {
        this.attempts = attempts;
    }
}
