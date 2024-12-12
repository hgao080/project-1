package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<Object> signupUser(@RequestBody User userDetails) {
        if (!userDetails.isSignupFilled()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "All fields must be filled");
            return ResponseEntity.badRequest().body(error);
        }

        if (!userDetails.isPasswordStrong()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Password not strong enough");
            return ResponseEntity.badRequest().body(error);
        }

        User emailTaken = userRepository.findByEmail(userDetails.getEmail());
        if (emailTaken != null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Email already taken");
            return ResponseEntity.badRequest().body(error);
        }

        User usernameTaken = userRepository.findByUsername(userDetails.getUsername());
        if (usernameTaken != null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username already taken");
            return ResponseEntity.badRequest().body(error);
        }

        String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
        userDetails.setPassword(hashedPassword);

        User user = userRepository.save(userDetails);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> userDetails) {
        User user = userRepository.findByEmail(userDetails.get("email"));

        if (user != null && user.getPassword().equals(userDetails.get("password"))) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/{username}") 
    public ResponseEntity<Object> updateUser(@PathVariable("username") String username, @RequestBody Map<String, String> data) {
        User user = userRepository.findByUsername(username);

        if (data.containsKey("username")) {
            user.setUsername(data.get("username"));
        } else {
            user.addJoinedEvents(data.get("eventName"));
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
