package com.example.demo.dto;

public class MarkingResultDTO {
    private String userEmail;
    private String result;
    
    public MarkingResultDTO(String userEmail, String result) {
        this.userEmail = userEmail;
        this.result = result;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
