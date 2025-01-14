package com.example.demo.models;

import jakarta.persistence.*;

import com.example.demo.enums.RoleEnum;

@Entity
public class Role {
    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public RoleEnum getName() {
        return name;
    }

    public Role setName(RoleEnum name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
