package com.example.demo.dto;

import java.util.Date;
import java.util.Map;

import com.example.demo.models.Attempt;

public class AttemptDTO {
    private String userEmail;
    private String competitionId;
    private Map<String, Integer> attempts;
    private Date competitionEnd;
    
    public AttemptDTO(String userEmail, String competitionId, Map<String, Integer> attempts, Date competitionEnd) {
        this.userEmail = userEmail;
        this.competitionId = competitionId;
        this.attempts = attempts;
        this.competitionEnd = competitionEnd;
    }

    public Attempt getAttempt() {
        return new Attempt(userEmail, competitionId, attempts);
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

    public Date getCompetitionEnd() {
        return competitionEnd;
    }

    public void setCompetitionEnd(Date competitionEnd) {
        this.competitionEnd = competitionEnd;
    }
    
    
}
