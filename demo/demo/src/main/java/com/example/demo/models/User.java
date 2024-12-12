package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

    @Id
    @JsonProperty("id")
    private String id;

    private String username;
    private String email;
    private String password;
    private Boolean isAdmin;
    private List<String> joinedEvents;
    
    public User() {
    }

    public User(String username, String email, String password, Boolean isAdmin, List<String> joinedEvents) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.joinedEvents = joinedEvents;
    }

    public boolean isSignupFilled() {
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return false;
        }
        return true;
    }

    public boolean isPasswordStrong() {
        
        boolean hasUppercase = false;
        boolean hasLowercase = false;
        boolean hasDigit = false;
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) {
                hasUppercase = true;
            } else if (Character.isLowerCase(c)) {
                hasLowercase = true;
            } else if (Character.isDigit(c)) {
                hasDigit = true;
            }
        }
        return hasUppercase && hasLowercase && hasDigit;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public List<String> getJoinedEvents() {
        return joinedEvents;
    }

    public void setJoinedEvents(List<String> joinedEvents) {
        this.joinedEvents = joinedEvents;
    }

    public void addJoinedEvents(String eventName) {
        this.joinedEvents.add(eventName);
    }

    
}
