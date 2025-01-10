package com.example.demo.dto;

public class EventDTO {
    private String competitionId;
    private String competitionStart;
    private String competitionEnd;

    public EventDTO(String competitionId, String competitionStart, String competitionEnd) {
        this.competitionId = competitionId;
        this.competitionStart = competitionStart;
        this.competitionEnd = competitionEnd;
    }
    public String getCompetitionId() {
        return competitionId;
    }
    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }
    public String getCompetitionStart() {
        return competitionStart;
    }
    public void setCompetitionStart(String competitionStart) {
        this.competitionStart = competitionStart;
    }
    public String getCompetitionEnd() {
        return competitionEnd;
    }
    public void setCompetitionEnd(String competitionEnd) {
        this.competitionEnd = competitionEnd;
    }
}
