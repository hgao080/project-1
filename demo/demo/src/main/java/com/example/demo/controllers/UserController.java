package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RegisterUserDTO;
import com.example.demo.enums.RoleEnum;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.JwtUtil;

@CrossOrigin
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Object> signupUser(@RequestBody RegisterUserDTO userDetails) {
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

        Optional<User> usernameTaken = userRepository.findByUsername(userDetails.getUsername());
        if (usernameTaken.isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username already taken");
            return ResponseEntity.badRequest().body(error);
        }

        String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

        if (optionalRole.isEmpty()) {
            return null;
        }
        
        var user = new User(userDetails.getUsername(), userDetails.getEmail(), hashedPassword, optionalRole.get());

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        Map<String, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("joinedEvents", user.getJoinedEvents());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> userDetails) {
        if (userDetails.get("email").isEmpty() || userDetails.get("password").isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "All fields must be filled");
            return ResponseEntity.badRequest().body(error);
        }

        User user = userRepository.findByEmail(userDetails.get("email"));
        if (user == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Incorrect email");
            return ResponseEntity.badRequest().body(error);
        }

        if (passwordEncoder.matches(userDetails.get("password"), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("joinedEvents", user.getJoinedEvents());
            response.put("token", token);

            return ResponseEntity.ok(response);
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Incorrect password");
        return ResponseEntity.badRequest().body(error);
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(userRepository.findAllNonAdminUsers());
    }

    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> updateUser(@PathVariable("username") String username,
            @RequestBody Map<String, String> data) {
        User user = userRepository.findByUsername(username).get();

        if (data.containsKey("username")) {
            Optional<User> existingUser = userRepository.findByUsername(data.get("username"));

            if (existingUser.isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Username already taken");
                return ResponseEntity.badRequest().body(error);
            }

            user.setUsername(data.get("username"));
            String token = jwtUtil.generateToken(data.get("username"));
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("joinedEvents", user.getJoinedEvents());
            response.put("token", token);
            userRepository.save(user);
            return ResponseEntity.ok(response);
        } else {
            user.addJoinedEvents(data.get("eventName"));
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
