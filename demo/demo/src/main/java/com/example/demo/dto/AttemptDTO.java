package com.example.demo.dto;

import java.util.Date;
import java.util.Map;

import com.example.demo.models.Attempt;

public class AttemptDTO {
    private String userEmail;
    private String eventId;
    private Map<String, Integer> attempts;
    private Date competitionEnd;
    
    public AttemptDTO(String userEmail, String eventId, Map<String, Integer> attempts, Date competitionEnd) {
        this.userEmail = userEmail;
        this.eventId = eventId;
        this.attempts = attempts;
        this.competitionEnd = competitionEnd;
    }

    public Attempt getAttempt() {
        return new Attempt(userEmail, eventId, attempts);
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

    public Date getCompetitionEnd() {
        return competitionEnd;
    }

    public void setCompetitionEnd(Date competitionEnd) {
        this.competitionEnd = competitionEnd;
    }
    
    
}
