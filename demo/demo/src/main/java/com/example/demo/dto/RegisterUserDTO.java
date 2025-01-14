package com.example.demo.dto;

public class RegisterUserDTO {
    private String email;
    private String username;
    private String password;

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

    public String getEmail() {
        return email;
    }
    public RegisterUserDTO setEmail(String email) {
        this.email = email;
        return this;
    }
    public String getUsername() {
        return username;
    }
    public RegisterUserDTO setUsername(String username) {
        this.username = username;
        return this;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
