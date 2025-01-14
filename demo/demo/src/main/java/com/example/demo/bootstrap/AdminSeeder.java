package com.example.demo.bootstrap;

import com.example.demo.dto.RegisterUserDTO;
import com.example.demo.models.Role;
import com.example.demo.enums.RoleEnum;
import com.example.demo.models.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public AdminSeeder(
        RoleRepository roleRepository,
        UserRepository  userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createSuperAdministrator();
    }

    private void createSuperAdministrator() {
        RegisterUserDTO userDto = new RegisterUserDTO();
        userDto.setUsername("admin").setEmail("admin").setPassword("admin");

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        User existingAdmin = userRepository.findByEmail(userDto.getEmail());

        if (optionalRole.isEmpty() || existingAdmin != null) {
            return;
        }

        var user = new User(userDto.getUsername(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()), optionalRole.get());

        userRepository.save(user);
    }
}