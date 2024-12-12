package com.example.demo.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("event")
public class Event {
    private String name;
    private String description;
    private String date;
    
    public Event() {
    }

    public Event(String name, String description, String date) {
        this.name = name;
        this.description = description;
        this.date = date;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    
}
