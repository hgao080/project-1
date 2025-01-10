package com.example.demo.models;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document("event")
public class Event {

    @Id
    @JsonProperty("id")
    private String id;

    private String name;
    private String description;
    private Date date;
    private Map<Object, Object> competition = new HashMap<Object, Object>();
    
    public Event() {
    }

    public Event(String name, String description, Date date) {
        this.name = name;
        this.description = description;
        this.date = date;
    }

    public void assignCompetition(String competitionId, Date competitionStart, Date competitionEnd) {
        competition.put("competitionId", competitionId);
        competition.put("competitionStart", competitionStart);
        competition.put("competitionEnd", competitionEnd);
    }

    public String getCompetitionId() {
        return (String) competition.get("competitionId");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<Object, Object> getCompetition() {
        return competition;
    }

    public void setCompetition(Map<Object, Object> competition) {
        this.competition = competition;
    }
}
